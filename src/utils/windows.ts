

type WindowType = chrome.windows.Window
type WindiwTab = (chrome.windows.Window & { tabs: chrome.tabs.Tab[] })


export async function getOpenWindows(): Promise<(WindiwTab)[]> {
  try {
    let windows: WindowType[]  = await chrome.windows.getAll({ populate: false,
      windowTypes: ['normal', 'popup', 'panel']
    });
    const windowsWithTabs: WindiwTab[] = await Promise.all(windows.map(async (window) => {
      const tabs = await chrome.tabs.query({ windowId: window.id });

      return {
        ...window,
        tabs,
      };
    }));
    return windowsWithTabs;

  } catch (error) {
	  alert("Error retrieving windows and tabs:");
    alert(error);
    return [];
  }
}


/**
 * getOpenWinById - Get a window by id
 *   @id: number window id
 */

export async function getOpenWinById(id: number): Promise<WindowType | undefined> {
  let win: WindowType | undefined;

  try {
    win = await chrome.windows.get(id);
  } catch (error) {
    console.log(error)
    return undefined;
  }
  return win;
}


export async function saveWindow(windowId: number) {
  let win: WindowType;
  try {
    win = await chrome.windows.get(windowId);
    const windows: Record<number, WindowType> = await getSavedWindows();
    if (win.id !== undefined) {
      windows[win.id] = win;
      await chrome.storage.sync.set({windows})
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getSavedWindows(): Promise<Record<number, WindowType>> {

  let windows: Record<number, WindowType>;
  let storage: any;
  try {
    storage = await chrome.storage.sync.get("windows");
    windows = storage.windows || {};
  } catch (error) {
    console.log(error);
    return {};
  }
  return windows;
}

export async function getSavedWinById(windowId: number): Promise<WindowType> {
  let windows: Record<number, WindowType> = await getSavedWindows();

  return windows[windowId];
}

