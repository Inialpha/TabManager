import getMaxTap from '../utils/tabs'
import setMaxTap from '../utils/tabs'
import manageTap from '../utils/tabs'


chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("Extension installed for the first time.");
    // Perform actions here, like setting default values, showing a welcome page, etc.
    chrome.storage.sync.set({ maxTabs: 10 }, () => {
      console.log("Default maxTabs value set to 10.");
    });
    chrome.tabs.create({ url: "welcome.html" });  // Optional: Open a welcome page
  } else if (details.reason === "update") {
    console.log("Extension updated to a new version.");
  }
});

chrome.tabs.onCreated.addListener((tab) => {

});

chrome.tabs.onActivated.addListener((activeInfo) => {
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
});


chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
});
