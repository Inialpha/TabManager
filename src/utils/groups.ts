type Tab = chrome.tabs.Tab;
type TabGroup = chrome.tabGroups.TabGroup;

export async function groupTabsByHostname(tabs: Tab[]) {
  try {
    const grouped = tabs.reduce((acc: { [key: string]: chrome.tabs.Tab[] }, tab) => {
      const url = new URL(tab.url || "");
      const hostname = url.hostname;

      if (!acc[hostname]) {
        acc[hostname] = []
      }
      acc[hostname].push(tab);
      return acc;
   
    }, {});

    return grouped;
  } catch (error) {
    console.log('Error grouping tabs by hostname:', error);
  }
}


export async function groupAllTabs() {
  const tabs: Tab[] = await getAllTabs();
  const groupedTabs = groupTabsByHostname(tabs)
  for (let [hostName, tabs] of Object.entries(groupedTabs)) {
    const tabId: number[] = tabs.map((tab: Tab) => tab.id);
    addToGroup(tabId, hostName);
  } 
}

export async function addToGroup(tabIds: number | number[], groupTitle: string) {
  let groupId: number | undefined;
  try {
    const group = await getGroup(groupTitle);

    if (group) {
      groupId = await chrome.tabs.group({
        tabIds: tabIds,
        groupId: group.id
      });
    } else {
      groupId = await chrome.tabs.group({
        tabIds: tabIds
      });
      if (groupId) {
        await updateTabGroup(groupId, {title: groupTitle});
      }
    }
  } catch (error) {
    console.log(error)
    groupId = undefined;
  }
  return groupId;
}

async function getGroup(title: string): Promise<TabGroup | undefined> {
  let group: chrome.tabGroups.TabGroup[];
  try {
    group = await chrome.tabGroups.query({title: title})
  } catch (error) {
    console.log(error);
    return;
  }
  return group[0];
}
  
export async function getAllTabGroups() {
  try {
    const tabGroups = await chrome.tabGroups.query({});
    return tabGroups;
  } catch (error) {
    console.log(error);
  }
}

async function updateTabGroup(groupId: number, data: object) {
  try {
    await chrome.tabGroups.update(groupId, data)

  } catch (error) {
    console.error(`Failed to update tab group: ${error}`);
  }
}

export function deleteTabGroup() {
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
