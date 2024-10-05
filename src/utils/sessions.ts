import { v4 as uuidv4 } from 'uuid';
import { WindiwTab, getOpenWindows, saveWindow, getSavedWinById, createWindow } from './windows';

//type Tab = chrome.tabs.Tab;

type Session = {
  name: string;
  id: string;
  windowIds: number[];
  timestamp: string;
};

export async function saveSession(sessionName: string) {

  const windows: WindiwTab[] = await getOpenWindows();
  const windowIds: number[] = windows.map((win: WindiwTab) => win.id)
  .filter((id): id is number => id !== undefined);
  for (let id of windowIds) {
    saveWindow(id);
  }
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


/*export function updateSession(sessionName: string, data: object) {
}*/

export async function deleteSession(sessionId: string){
  const sessions = await chrome.storage.sync.get({sessions: {}});
  delete sessions[sessionId];
  chrome.storage.sync.set({sessions: sessions});
}
