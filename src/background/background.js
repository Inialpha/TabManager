import { tabOnUpdated } from '../utils/tabs/events'
//import { tabOnCreated, tabOnActivated, tabOnRemoved} from '../utils/tabs/events'

// Load max tab value from storage

// Load the on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: 'index.html'
  })
});


//chrome.tabs.onCreated.addListener(tabOnCreated);
chrome.tabs.onUpdated.addListener(tabOnUpdated);
//chrome.tabs.onActivated.addListener(tabOnActivated);
//chrome.tabs.onRemoved.addListener(tabOnRemoved);
