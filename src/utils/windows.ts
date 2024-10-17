export type WindowType = chrome.windows.Window;
export type WindowTab = chrome.windows.Window & {
  tabs: chrome.tabs.Tab[];
  groups?: chrome.tabGroups.TabGroup[];
};

export interface NewTab {
  url: string | undefined;
  active: boolean | undefined;
  windowId: number | undefined;
}

export async function getOpenWindows(): Promise<WindowTab[]> {
  try {
    let windows: WindowType[] = await chrome.windows.getAll({
      populate: false,
      windowTypes: ["normal", "popup", "panel"],
    });
    const windowsWithTabs: WindowTab[] = await Promise.all(
      windows.map(async (win) => {
        const tabs = await chrome.tabs.query({ windowId: win.id });
        const groups = await chrome.tabGroups.query({ windowId: win.id });

        return {
          ...win,
          tabs,
          groups,
        };
      })
    );
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

export async function getOpenWinById(
  id: number
): Promise<WindowType | undefined> {
  let win: WindowType | undefined;

  try {
    win = await chrome.windows.get(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
  return win;
}



export async function saveWindow(win: WindowTab) {
  try {
    console.log("Window to save: ", win);
    const windows: Record<number, WindowTab> = await getSavedWindows();

    if (win.id !== undefined) {
      windows[win.id] = win;
      console.log('Populated window: ', windows[win.id]);
      await chrome.storage.sync.set({ windows });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getSavedWindows(): Promise<Record<number, WindowTab>> {
  let windows: Record<number, WindowTab>;
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
      focused: focused,
    });

    return newWindow;
  } catch (error) {
    console.error("Error creating new window:", error);
  }
}

export async function minimizeWindow(windowId: number): Promise<void> {
  try {
    await chrome.windows.update(windowId, { state: "minimized" });
  } catch (error) {
    alert(error);
  }
}

export async function closeWindow(windowId: number): Promise<void> {
  try {
    await chrome.windows.remove(windowId);
  } catch (error) {
    console.log(error);
  }
}
