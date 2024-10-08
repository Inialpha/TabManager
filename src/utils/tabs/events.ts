import { addToGroup } from "../groups";
import { getAllTabs } from "../tabs";

type Tab = chrome.tabs.Tab;

type TabData = {
  [tabId: number]: {
    groupId: number | undefined;
    groupName: string;
  };
};

type DomainData = {
  [domainName: string]: {
    startTime: number;
    totalTime: number;
  };
};
let prevDomain: string = "";

const tabData: TabData = {};
const domainData: DomainData = {};
let inactivityTimer: number | null = null;
const TIME_LIMIT = 1 * 60 * 1000; // Set the time limit in milliseconds (30 minutes)

/*********** TAB EVENTS HANDLERS **********/

export const tabOnCreated = async (_newTab: Tab) => {
  try {
    const maxTabs = await getMaxTabs();
    const tabs = await getAllTabs();
    if (tabs.length > maxTabs) {
      closeLeastRecentlyUsedTab();
    }
  } catch (error) {
    console.log("Errors everywhere");
  }
};

export const tabOnUpdated = async (tab: chrome.tabs.Tab) => {
  try {
    if (tab.id && tab.url) {
      closeDuplicateTab(tab);
      const url = new URL(tab.url);
      const hostName = url.hostname;
      const groupId = await addToGroup(tab.id, hostName);
      tabData[tab.id].groupName = hostName;
      tabData[tab.id].groupId = groupId;
      if (hostName !== prevDomain) {
        if (!domainData[hostName]) {
          domainData[hostName] = { startTime: 0, totalTime: 0 };
        }

        domainData[hostName].startTime = Date.now();
        domainData[prevDomain].totalTime +=
          Date.now() - domainData[prevDomain].startTime;
        prevDomain = hostName;
        if (inactivityTimer) {
          clearTimeout(inactivityTimer);
        }
        inactivityTimer = setTimeout(
          () => notifyUserOfInactivity(hostName),
          TIME_LIMIT
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

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
        domainData[prevDomain].totalTime +=
          Date.now() - domainData[prevDomain].startTime;
      }

      // Start the timer for the new domain
      domainData[hostName].startTime = Date.now();
      prevDomain = hostName;
    }
  } catch (error) {
    console.log("Error in tab activation:", error);
  }
};

export const tabOnRemoved = async (tabId: number, _: any) => {
  try {
    const closedTab = await chrome.tabs.get(tabId);

    if (closedTab && closedTab.url) {
      const url = new URL(closedTab.url);
      const hostName = url.hostname;

      // Stop timing the domain when the tab is closed
      if (domainData[hostName]) {
        domainData[hostName].totalTime +=
          Date.now() - domainData[hostName].startTime;
      }

      // Clean up tab data
      delete tabData[tabId];
    }
  } catch (error) {
    console.log("Error in tab removal:", error);
  }
};

export async function closeLeastRecentlyUsedTab() {
  const tabs = await getAllTabs();
  tabs.sort((a: Tab, b: Tab) => (a.lastAccessed ?? 0) - (b.lastAccessed ?? 0));

  const oldestTab = tabs[tabs.length];
  if (oldestTab && oldestTab.id) {
    chrome.tabs.remove(oldestTab.id);
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
    maxTab = data.maxTap;
  } catch (error) {
    console.log(error);
    maxTab = 10;
  }
  return maxTab;
}

export const closeDuplicateTab = async (newTab: Tab) => {
  const allTabs = await getAllTabs();
  try {
    allTabs.forEach(async (tab: Tab) => {
      if (tab.id !== newTab.id && tab.url) {
        const tabUrl = new URL(tab.url).href;

        if (tabUrl === newTab.url && tab.id) {
          await chrome.tabs.remove(tab.id);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const notifyUserOfInactivity = (domain: string) => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png", // Set the path to your notification icon
    title: "Time Alert",
    message: `You have been on ${domain} for too long!`,
    priority: 2,
  });
};
