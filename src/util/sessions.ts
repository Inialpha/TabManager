import { v4 as uuidv4 } from 'uuid';

type Tab = chrome.tabs.Tab;
type SessionTab = {
  id: number | undefined;
  url: string | undefined;
  title: string | undefined;
  favIconUrl: string | undefined;
};

type Session = {
  name: string;
  id: string;
  tabs: SessionTab[];
  timestamp: string;
};

export async function saveSession(sessionName: string) {
  let sessionTabs: SessionTab[] = []
  const tabs = await chrome.tabs.query({});

  sessionTabs = tabs.map((tab: Tab) => ({
    id: tab.id,
    url: tab.url,
    title: tab.title,
    favIconUrl: tab.favIconUrl
  }));

  const sessionData: Session = {
    id: uuidv4(),
    name: sessionName,
    tabs: sessionTabs,
    timestamp: new Date().toISOString(),
  };

   const sessions = await chrome.storage.sync.get({sessions: []});
   sessions.push(sessionData);

   chrome.storage.sync.set({sessions}, () => {
     console.log('Session saved:', sessionName);
  });
}

export async function loadSession(sessionId: string) {
  const sessions = await chrome.storage.sync.get({sessions: []});
  const session = sessions.find((s: Session) => s.id = sessionId);
  if (session) {
    session.tabs.forEach((tab: SessionTab) => {
      chrome.tabs.create({url: tab.url});
    });
  }
}


/*export function updateSession(sessionName: string, data: object) {
}*/

export async function deleteSession(sessionName: string){
  const sessions = await chrome.storage.sync.get({sessions: []});

  const updatedSessions = sessions.filter((s: Session) => s.name != sessionName)

  chrome.storage.sync.set({sessions: updatedSessions});
}
