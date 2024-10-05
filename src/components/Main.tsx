import { useState, useEffect } from "react"
import { Tooltip } from "@chakra-ui/react"
import { getAllTabs } from '../utils/tabs'
import { getAllWindows } from "../utils/windows"


const Main = () => {
    type TabType = chrome.tabs.Tab;
    type WindowType = chrome.windows.Window;

    const [tabs, setTabs] = useState<TabType[]>([]);
    const [allWindows, setWindows] = useState<WindowType[]>([]);

    useEffect(() => {
        const fetchTabs = async () => {
            const fetchedTabs = await getAllTabs();
            const fetchWindows = await getAllWindows();
            setTabs(fetchedTabs);
            setWindows(fetchWindows);
        };
        fetchTabs();
    }, []);

    return (
        <main className="border flex-1 h-[80vh] overflow-x-hidden bg-slate-100 overflow-y-auto p-1">
            <section className="space-y-2 rounded-md bg-white p-2 shadow-md w-full h-full ">
                <article className="font-semibold flex items-center">
                    <h3 className="text-center flex-1">Chrome window 1</h3>
                    <Menu />
                </article>

                {tabs.map((tab: TabType) => (
                    <Tab
                        key={tab.id}
                        logo={tab.favIconUrl || ""}
                        title={tab?.title}
                        active={tab.active}
                    />
                ))
                }
            </section>
        </main>
    )
}

export const Tab = ({ logo, title, active }: { logo: string, title: string | undefined, active: boolean }) => {
    return (
        <article className="flex text-sm space-x-2 items-center w-full py-2">
            <div className="w-4 border h-4 p-2">
                <img src={logo} alt={title} />
            </div>
            <div className="flex-1 font-medium flex items-center justify-between">
                <p>{title} </p>
                {active && <p className="bg-gray-800 rounded-md px-2 text-xs py-1 font-medium text-slate-50">Active</p>}
            </div>

        </article>
    )
}

export const Menu = () => {
    const handleMinimize = () => {

    }
    const handleClose = () => {

    }
    return (
        <div className="flex items-center space-x-2">
            <Tooltip hasArrow label='New tab' bg='gray.600' className="text-white">
                <button className="menu-bar">
                    <span className="fluent--form-new-20-filled"></span>
                </button>
            </Tooltip>
            <Tooltip hasArrow label='Minimize window' bg='gray.600' className="text-white">
                <button className="menu-bar" onClick={handleMinimize}>
                    <span className="solar--minimize-square-minimalistic-outline"></span>
                </button>
            </Tooltip>
            <Tooltip hasArrow label='Close window' bg='gray.600' className="text-white">
                <button className="menu-bar" onClick={handleClose}>
                    <span className="ri--close-circle-line"></span>
                </button>
            </Tooltip>
        </div>
    )
}

export default Main;
