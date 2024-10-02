export function getMaxTabs() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("maxTabs", (data) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(data.maxTabs || 10); // Default value if not set
      }
    });
  });
}

export function getAllTabs() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({}, (tabs) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(tabs);
      }
    });
  });
}
