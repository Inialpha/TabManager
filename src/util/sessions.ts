export async function saveSession(sessionName) {
  const sessionTabs = []
  const tabs = await chrome.tabs.query({});

  sessionTabs = tabs.map(tab => ({
    id: tab.id,
    url: tab.url,
    title: tab.title,
    favIconUrl: tab.favIconUrl
  }));

  const sessionData = {
    name: sessionName,
    tabs: sessionTabs,
    timestamp: new Date().toISOString(),
  };

   const sessions = await chrome.storage.sync.get({sessions: []}).sessions;
   sessions.push(sessionData);

   chrome.storage.sync.set({sessions}, () => {
     console.log('Session saved:', sessionName);
  });
}

export function loadSession(session) {
  const sessions = await chrome.storage.sync.get({sessions: []}).sessions;

  sessions.tabs.forEach(tab => {
    chrome.tabs.create({url: tab.url});
  });
}


export function updateSession(session, data: object) {

}

export function deleteSession(session) {
  const sessions = await chrome.storage.sync.get({sessions: []}).sessions;

  const updatedSessions = sessions.filter(s
}
