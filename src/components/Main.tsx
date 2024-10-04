import { useEffect, useState } from 'react'
import { getAllTabs } from '../utils/tabs'

type TabType = chrome.tabs.Tab;
const Main = () => {
    const [tabs, setTabs] = useState<TabType[]>([]);
    useEffect(() => {
        const fetchTabs = async () => {
            const fetchedTabs = await getAllTabs();
            setTabs(fetchedTabs);
        };
        fetchTabs();
    }, []);
    return (
        <main className="px-3 py-1">
	    {tabs.map((tab: TabType) => (
            <Tab
                logo={tab.favIconUrl || ""}
                title="Cloud management console - Get started"
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
