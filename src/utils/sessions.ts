import { v4 as uuidv4 } from 'uuid';
import { WindowTab, getOpenWindows, saveWindow, getSavedWinById, createWindow } from './windows';

//type Tab = chrome.tabs.Tab;

export type Session = {
  name: string;
  id: string;
  windowIds: number[];
  timestamp: string;
};

export async function saveSession(sessionName: string) {

  const windows: WindowTab[] = await getOpenWindows();
  const windowIds: number[] = windows.map((win: WindowTab) => win.id)
  .filter((id): id is number => id !== undefined);

  await Promise.all(windowIds.map(id => saveWindow(id)));
  const sessionData: Session = {
    id: uuidv4(),
    name: sessionName,
    windowIds: windowIds,
    timestamp: new Date().toISOString(),
  };
   
   const data = await chrome.storage.sync.get({sessions: {}});
   data.sessions[sessionData.id] = sessionData;
   await chrome.storage.sync.set({sessions: data.sessions})
}

export async function loadSession(sessionId: string) {
  const data = await chrome.storage.sync.get({sessions: {}});
  const session = data.sessions[sessionId];
  if (session) {
    session.windowIds.forEach( async (id: number) => {
      const win = await getSavedWinById(id);
      const newWindow = await createWindow();
      if (newWindow) {
        newWindow.tabs = win.tabs;
      }
    });
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
