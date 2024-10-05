export async function getAllWindows(): Promise<chrome.windows.Window[] | []> {
  let windows: chrome.windows.Window[];
  const queryObject = {
    populate: true,
    windowType: ["normal"]
  }
  try {     
    windows = await chrome.windows.getAll(queryObject);
  } catch (error) {
    console.log(error)
    windows = []
  }
  return windows;
}

export async function getTabByWindow(windowId: number): Promise<chrome.tabs.Tab[] | []> {
  let tabs: chrome.tabs.Tab[];
  try {
    tabs = await chrome.tabs.query({ windowId });
  } catch (error) {
    console.log(error)
    return []
  }
  return tabs
}
