import { addToGroup } from '../groups';
import { getAllTabs } from '../tabs';

type Tab = chrome.tabs.Tab;

type TabData = {
  [tabId: number]: {
    groupId: number | undefined;
    groupName: string;
    lastAccessed: number;
  };
};

type DomainData = {
  [domainName: string]: {
    startTime: number
    totalTime: number;
  }
}
let prevDomain: string = "";

const tabData: TabData = {};
const domainData: DomainData = {};
let inactivityTimer: number | null = null;
const TIME_LIMIT = 1 * 60 * 1000; // Set the time limit in milliseconds (30 minutes)

/*********** TAB EVENTS HANDLERS **********/

export const tabOnCreated = async (_newTab: Tab) => {
}

export const tabOnUpdated = async (_tabId: number, _changeInfo: any, tab: chrome.tabs.Tab) => {
  try {
    if (tab.id && tab.url) {
      closeDuplicateTab(tab);
      const url = new URL(tab.url);
      const hostName = url.hostname;
      const groupId = await addToGroup(tab.id, hostName)
      if (!tabData[tab.id]) {
        tabData[tab.id] = { groupId: groupId, groupName: hostName, lastAccessed: Date.now() }
      } else {
        tabData[tab.id].groupName = hostName;
        tabData[tab.id].groupId = groupId;
        tabData[tab.id].lastAccessed = Date.now();
      }
      if (hostName !== prevDomain) {
        if (!domainData[hostName]) {
          domainData[hostName] = { startTime: 0, totalTime: 0 };
        }

        domainData[hostName].startTime = Date.now();
	if (prevDomain && domainData[prevDomain]) {
          domainData[prevDomain].totalTime += Date.now() - domainData[prevDomain].startTime;
	}
	prevDomain = hostName;
	if (inactivityTimer) {
        clearTimeout(inactivityTimer)
	}
	inactivityTimer = setTimeout(() => notifyUserOfInactivity(hostName), TIME_LIMIT);
      }
      const maxTabs = await getMaxTabs();
      const tabs = await getAllTabs();
      if (tabs.length > maxTabs) {
        await closeLeastRecentlyUsedTab(tabs)
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export const tabOnActivated = async (activeInfo: any) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);

    if (tab.url) {
      const url = new URL(tab.url);
      const hostName = url.hostname;

      if (!domainData[hostName]) {
        domainData[hostName] = { startTime: 0, totalTime: 0 };
      }

      // Stop the timer for the previous domain
      if (prevDomain && domainData[prevDomain]) {
        domainData[prevDomain].totalTime += Date.now() - domainData[prevDomain].startTime;
      }

      // Start the timer for the new domain
      domainData[hostName].startTime = Date.now();
      prevDomain = hostName;
    }
  } catch (error) {
    console.log("Error in tab activation:", error);
  }
};

export const tabOnRemoved = async (tabId: number, _removeInfo: object) => {
  try {
    if (tabData[tabId]) {
      const hostName = tabData[tabId].groupName;

      if (domainData[hostName]) {
        domainData[hostName].totalTime += Date.now() - domainData[hostName].startTime;
      }
    }

  } catch (error) {
    console.log("Error in tab removal:", error);
  }
};

export async function closeLeastRecentlyUsedTab(_tabs: Tab[]) {

  try {
    const sortedTabs = Object.entries(tabData)
      .sort(([, a], [, b]) => a.lastAccessed - b.lastAccessed)
    if (sortedTabs.length > 0) {
      const oldestTab  = sortedTabs[0];
      const id: number = Number(oldestTab[0]);
      delete tabData[id];
      await chrome.tabs.remove(Number(oldestTab[0]));
    }
  } catch (error) {
    console.log("in closeLeastRecentlyUsedTab:", error);
  }
}

export async function setMaxTabs(maxTabs: number): Promise<void> {
  try {
    await chrome.storage.sync.set({ maxTabs });
  } catch (error) {
    console.log(error);
  }
}


export async function getMaxTabs(): Promise<number> {
  let maxTab: number;
  try {
    const data = await chrome.storage.sync.get("maxTabs");
    maxTab = data.maxTap || 20;
  } catch (error) {
    console.log(error);
    maxTab = 20
  }
  return maxTab;
}

export const closeDuplicateTab = async (newTab: Tab) => {
  const allTabs = await getAllTabs();
  try {
    for (let tab of allTabs) {
      if (tab.id !== newTab.id && tab.url) {
        const tabUrl = new URL(tab.url).href;

        if (tabUrl === newTab.url && tab.id) {
          await chrome.tabs.remove(tab.id);
	  break;
        }
      }
    };
  } catch(error) {
    console.log(error);
  }
}

const notifyUserOfInactivity = (domain: string) => {
	console.log("timer ran");
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'public/apple.png', // Set the path to your notification icon
    title: 'Time Alert',
    message: `You have been on ${domain} for too long!`,
    priority: 2,
  });
};

export async function moveTabToNewWindow(tab: Tab) {
  try {
    await chrome.windows.create({
      tabId: tab.id,
      focused: true,
    });
  } catch (error) {
    console.error("Failed to move tab to new window:", error);
  }
}
