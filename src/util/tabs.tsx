const tabData = [];

/*********** TAB EVENTS HANDLERS **********/

export const tabOnCreated = async (newTab) {
  tabData[tab.id] = {
    lastVisited: new Date(),
    totalTime: 0,
    groupId: null,
    groupName: ""
  }
  try {
    const maxTabs = await getMaxTabs();
    const tabs = await getAllTabs();
    if (tabs.lenght > maxTabs) {
      closeLeastRecentlyUsedTab()
    }
  } catch (error) {
      console.log("Errors everywhere");
  }
}

export const tabOnUpdated = async (newTab) {
  await groupTabs(newTab)
  tabData[tab.id]

/*********** TAB CRUD FUNCTIONS ***********/

export async function createTab(url: string): chrome.tabs.Tab {
  try {
    const = await chrome.tabs.create({ url });
  } catch (error) {
    console.log(error);
  }
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

function closeLeastRecentlyUsedTab() {
  tabData.sort((a, b) => a.lastVisited - b.lastVisited);
  const leastUsedTab = tabData.shift();
  chrome.tabs.remove(leastUsedTab.id);
}

export function setMaxTabs() {
}


export async function getMaxTabs() {
  try {
    return await chrome.storage.sync.get("maxTabs").maxTap;
  } catch (error) console.log(error)
}

export async function getTabByWindow(windowId: number): Promise<chrome.tabs.Tab[]> {
  try {
    return await chrome.tabs.query({});
  } catch (error) {
    console.log(error)
  }
}

export async function getAllTabs() {
  const windows = await getAllWindows();
  tabs = {}
  try {
    return await chrome.tabs.query({});
  } catch (error) {
    console.log(error)
  }
}
