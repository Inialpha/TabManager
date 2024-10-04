export async function groupTabsByHostname(tabs) {
  try {
    const grouped = tabs.reduce((acc, tab) => {
      const url = new URL(tab.url);
      const hostname = url.hostname;

      if (!acc[hostname]) {
        acc[hostname] = [];
      }
      acc[hostname].push(tab);
      return acc;
    }, {});

    return grouped;
  } catch (error) {
    console.log('Error grouping tabs by hostname:', error);
  }
}


export async function groupTabs(tabs = []) {
  if (Array.isArray(tabs) && tabs.lenght < 1) {
    tabs = getAllTabs();
  } else if (!Array.isArray(tabs)) {
    tabs = [tabs]
  }
  groupedTabs = groupTabsByHostname(tabs)
  for (let [hostName, tabs] of Object.entries(groupTabs)) {
    const group = await getGroup({title: hostName})
    if (group != null || group != []) {
      chrome.tab.group({
        tabIds: tabs,
        groupId: group.Id
      });
    } else {
      const groupId = await chrome.tab.group({
        tabIds: tabs
      });
      await updateTabGroup(groupId, {title: hostName});
    }
  } 
}

async function getGroup() {
}
  
async function getAllTabGroups() {
  try {
    tabGroups = await chrome.tabGroups.query({});
    return tabGroups;
  } catch (error) {
    console.log(error);
  }
}

export function deleteTabGroup() {
}
