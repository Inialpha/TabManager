import { addToGroup } from './groups';

type Tab = chrome.tabs.Tab;

type TabData = {
  [tabId: number]: {
    totalTime: number;
    groupId: number | undefined;
    groupName: string;
  };
};


const tabData: TabData = {};

/*********** TAB EVENTS HANDLERS **********/

export const tabOnCreated = async (newTab: Tab) => {
  if (newTab.id) {
    tabData[newTab.id] = {
      totalTime: 0,
      groupId: undefined,
      groupName: ""
    }
  }
  try {
    const maxTabs = await getMaxTabs();
    const tabs = await getAllTabs();
    if (tabs.length > maxTabs) {
      closeLeastRecentlyUsedTab()
    }
  } catch (error) {
      console.log("Errors everywhere");
  }
}

export const tabOnUpdated = async (tab: chrome.tabs.Tab) => {
  try {
    if (tab.id && tab.url) {
      const url = new URL(tab.url);
      const hostName = url.hostname;
      const groupId = await addToGroup(tab.id, hostName)
      tabData[tab.id].groupName = hostName
      tabData[tab.id].groupId = groupId
    }
  } catch (error) {
    console.log(error);
  }
}
/*********** TAB CRUD FUNCTIONS ***********/

export async function createTab(url: string): Promise<chrome.tabs.Tab | undefined> {
  let tab: chrome.tabs.Tab;
  try {
     tab = await chrome.tabs.create({ url });
  } catch (error) {
    console.log(error);
    return;
  }
  return tab;
}

export function removeTab(tabId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.tabs.remove(tabId, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

/**
 * closeLeastRecentlyUsedTab
 */

async function closeLeastRecentlyUsedTab() {
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
    maxTab = 10
  }
  return maxTab;
}

export async function getTabByWindow(windowId: number): Promise<chrome.tabs.Tab[] | []> {
  let tabs: chrome.tabs.Tab[];
  try {
    tabs = await chrome.tabs.query({ windowId });
  } catch (error) {
    console.log(error);
    return [];
  }
  return tabs;
}

const getAllTabs = async (): Promise<chrome.tabs.Tab[] | []>  => {
  let tabs: chrome.tabs.Tab[];
  try {
    tabs = await chrome.tabs.query({});
  } catch (error) {
    console.log(error);
    tabs = [];
  }
  return tabs;
}
