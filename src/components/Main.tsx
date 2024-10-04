import { useState, useEffect } from "react"
import { Tooltip } from "@chakra-ui/react"
import { getAllTabs } from '../utils/tabs'


const Main = () => {
    type TabType = chrome.tabs.Tab;
    const [tabs, setTabs] = useState<TabType[]>([]);
    useEffect(() => {
        const fetchTabs = async () => {
            const fetchedTabs = await getAllTabs();
            setTabs(fetchedTabs);
        };
        fetchTabs();
    }, []);
   
    const handleClose = () => {

    }

    const handleMinimize = () => {

    }
    return (
        <main className="border flex-1 h-[80vh] overflow-x-hidden bg-slate-100 overflow-y-auto p-1">
            <section className="space-y-2 rounded-md bg-white p-2 shadow-md w-full h-full ">
                <article className="font-semibold flex items-center">
                    <h3 className="text-center flex-1">Chrome window 1</h3>
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
                </article>
                
                {tabs.map((tab: TabType) => (
                    <Tab
                        logo={tab.favIconUrl || ""}
                        title="Cloud management console - Get started"
                    />
                    ))
                }
            </section>
        </main>
    )
}

export const Tab = ({logo, title}: {logo: string, title: string}) => {
    return (
        <article className="flex space-x-2 items-center w-full py-2">
            <div className="w-4 h-4">
                <img src={logo} alt={title} className="w-full h-full p-1 border border-gray-900" />
            </div>
            <p className="flex-1 font-medium">{title}</p>
        </article>
    )
}

export default Main;
