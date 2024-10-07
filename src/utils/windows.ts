

export type WindowType = chrome.windows.Window
export type WindiwTab = (chrome.windows.Window & { tabs: chrome.tabs.Tab[] })


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


export async function createWindow(focused = true) {
  try {
    const newWindow = await chrome.windows.create({
      focused: focused
    });

    return newWindow;
  } catch (error) {
    console.error("Error creating new window:", error);
  }
}

function minimizeWindow(windowId: number): void {
    chrome.windows.update(windowId, { state: 'minimized' }, () => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        } else {
            console.log(`Window ${windowId} minimized`);
        }
    });
}
