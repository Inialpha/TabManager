import { v4 as uuidv4 } from 'uuid';
import { createWindow, NewTab } from './windows';
import { getAllTabs } from './tabs';

//type Tab = chrome.tabs.Tab;

export type Session = {
  name: string;
  id: string;
  tabs: NewTab[];
  timestamp: string;
};

export async function saveSession(sessionName: string) {

  const tabs: chrome.tabs.Tab[] = await getAllTabs();

  const newTabs: NewTab[] = tabs.map((tab) => {
    return ({
      url: tab.url,
      active: tab.active,
      windowId: tab.windowId
    })
  });

  const sessionData: Session = {
    id: uuidv4(),
    name: sessionName,
    tabs: newTabs,
    timestamp: new Date().toISOString(),
  };
   console.log('Session data: ', sessionData);
   const data = await chrome.storage.sync.get({sessions: {}});
   data.sessions[sessionData.id] = sessionData;
   await chrome.storage.sync.set({sessions: data.sessions})
   console.log('Saved session completed');

}

export async function loadSession(sessionId: string) {
  const data = await chrome.storage.sync.get({sessions: {}});
  console.log('Get Data From loadSession: ', data);
  console.log('Session Id: ', sessionId);
  const session = data.sessions[sessionId];
  console.log('Session to load: ', session);
  
  if (session) {
    // Create a new window for the session
      console.log('Session windowIds: ', session.windowIds);
      const tabsByWindowId = new Map();
      session.tabs.forEach((tab: NewTab) => {
        if (!tabsByWindowId.has(tab.windowId)) {
          tabsByWindowId.set(tab.windowId, []);
        }
        tabsByWindowId.get(tab.windowId).push(tab);
      });
      Object().add
      for (const [_, tabs] of tabsByWindowId) {
        // Create a new window
        const newWindow = await createWindow();
  
        // Create tabs in the new window
        const tabPromises = tabs.map((tab: NewTab) => {
          if (tab && tab.url) {
            console.log('Creating tab for URL: ', tab.url);
            return chrome.tabs.create({
              windowId: newWindow?.id, // Use the ID of the newly created window
              url: tab.url,
              active: tab.active // Set tab to active if specified
            });
          }
        });
        await Promise.all(tabPromises);
      }
  }
}

export async function getSessions() {
  const data = await chrome.storage.sync.get({sessions: {}});
  return data.sessions;
}


/*export function updateSession(sessionName: string, data: object) {
}*/

export async function deleteSession(sessionId: string){
  const sessions = await chrome.storage.sync.get({sessions: {}});
  delete sessions[sessionId];
  chrome.storage.sync.set({sessions: sessions});
}
