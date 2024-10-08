type Tab = chrome.tabs.Tab;

/*type TabData = {
  [tabId: number]: {
    groupId: number | undefined;
    groupName: string;
  };
};

type DomainData = {
  [domainName: string]: {
    startTime: number
    totalTime: number;
  }
}

const prevDomain: string = "";

const tabData: TabData = {};
const domainData: DomainData = {};
*/

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

export async function removeTab(tabId: any): Promise<void> {
    try {
      await chrome.tabs.remove(tabId);
    } catch(error) {
        console.log(error);
    }
}

/**
 * closeLeastRecentlyUsedTab
 */

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

export const getAllTabs = async (): Promise<chrome.tabs.Tab[] | []>  => {
  let tabs: chrome.tabs.Tab[];
  try {
    tabs = await chrome.tabs.query({});
  } catch (error) {
    console.log(error);
    tabs = [];
  }
  return tabs;
}
