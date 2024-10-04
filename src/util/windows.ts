export async function getAllWindows(): Promise<chrome.windows.Window[]> {
  const queryObject = {
    populate: true,
    windowType: ["normal"]
  }
  try {                                         return await chrome.windows.getAll(
      queryOptions: queryObject
    );
  } catch (error) {                             console.log(error)
  }
}

export async function getTabByWindow(windowId: number): Promise<chrome.tabs.Tab[]> {
  try {
    return await chrome.tabs.query({});
  } catch (error) {
    console.log(error)
  }
}
