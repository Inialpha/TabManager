import { tabOnUpdated, tabOnCreated, tabOnActivated, tabOnRemoved } from '../utils/tabs/events'

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


chrome.tabs.onCreated.addListener(async (tab) => {

    await chrome.tabs.sendMessage(tab.id, { message: `Tab ${tab.id} created.....` });
  tabOnCreated(tab);

    chrome.notifications.create({
      type: "basic",
      title: "New Tab Created",
      iconUrl: "",
      message: `Tab ${tab.id} created.,..!`,
      priority: 1
    });
});


chrome.tabs.onActivated.addListener((activeInfo) => {
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.tabs.sendMessage(tab.id, { message: `Tab ${tab.id} createdxxxxx` });
  tabOnUpdated(tab);
	chrome.notifications.create({
      type: "basic",
title: "New Tab Created",
      iconUrl: "public/apple.jpg",
message: `Tab ${tab.id} created.,..!`,
      priority: 1
    });

});

// Attaching the callbacks to Chrome's event listeners
chrome.tabs.onUpdated.addListener(tabOnUpdated);
chrome.tabs.onActivated.addListener(tabOnActivated);
chrome.tabs.onRemoved.addListener(tabOnRemoved);
