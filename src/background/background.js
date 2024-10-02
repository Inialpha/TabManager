let maxTabs = 10;                                          let tabActivity = [];

// Load max tab value from storage
chrome.storage.sync.get("maxTabs", (data) => {
        console.log(data)
  if (data.maxTabs) {                                          maxTabs = data.maxTabs;
  }
  // Track tab activity (least recently used and least used logic)
  chrome.tabs.onCreated.addListener((tab) => {
    // Add the new tab to the tracking list
    tabActivity.push({ id: tab.id, lastAccessed: Date.now()
 });
                                                             // Get all open tabs
  chrome.tabs.query({}, (tabs) => {
    if (tabs.length > maxTabs) {
      // Close the least recently used (LRU) tab                 closeLeastRecentlyUsedTab();
    }
  });
});                                                        });

chrome.tabs.onActivated.addListener((activeInfo) => {
  const index = tabActivity.findIndex(tab => tab.id === activeInfo.tabId);
  if (index !== -1) {
    // Update last accessed time for the tab
    tabActivity[index].lastAccessed = Date.now();
  }
});

function closeLeastRecentlyUsedTab() {
  // Sort tabs by last accessed time
  tabActivity.sort((a, b) => a.lastAccessed - b.lastAccessed);                                                        
  // Close the tab that was least recently accessed
	const leastUsedTab = tabActivity.shift(); // get and remove the first item
	chrome.tabs.remove(leastUsedTab.id);
}
