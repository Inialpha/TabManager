import { getMaxTap, setMaxTap } from '../utils/tabs'

// Load max tab value from storage

// Load the on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: 'index.html'
  })
});

// path to setting page
const openSettings = () => {
  chrome.tabs.create({
    url: 'public/options.html'
  })
}


chrome.tabs.onCreated.addListener((tab) => {

});

chrome.tabs.onActivated.addListener((activeInfo) => {
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
});


chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
});
