import { useEffect, useState } from 'react'
import { getOpenWindows } from '../utils/windows'

//type TabType = chrome.tabs.Tab;
type WindowType = (chrome.windows.Window & { tabs: chrome.tabs.Tab[] })
const Main = () => {
    //const [tabs, setTabs] = useState<TabType[]>([]);
    const [windows, setWindows] = useState<WindowType[]>([]);
    useEffect(() => {
        const fetchTabs = async () => {
            //const fetchedTabs = await getAllTabs();
            const fetchedWindows = await getOpenWindows();
          
            setWindows(fetchedWindows);
            alert(fetchedWindows.length)
            //setTabs(fetchedTabs);
        };
        fetchTabs();
    }, []);
    return (
        <main className="px-3 py-1">
	    {windows.map((win) => (
            <Tab
                logo={"4"}
                title={String(win.tabs.length)}
            />
            ))

            }
        </main>
    )
}

export const Tab = ({logo, title}: {logo: string, title: string}) => {
    return (
        <article className="flex space-x-2 items-center">
            <img src={logo} alt={title} className="w-4 h-4 rounded-md border" />
            <p className="flex-1 text-xs">{title}</p>
        </article>
    )
}

export default Main;
