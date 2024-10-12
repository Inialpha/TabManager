import { Tooltip } from "@chakra-ui/react"
import { Accordion, AccordionButton, AccordionPanel, Box, AccordionItem } from "@chakra-ui/react"
import { TabType } from "../popup/popup"
import { WindowTab } from "../utils/windows"
import { useState } from "react"


const Main = ({filterTabs, allWindow, closeWins}: {allWindow: WindowTab[], closeWins: (id: any) => void, filterTabs: number[]}) => {

    return (
        <main className="border flex-1 h-[80vh] overflow-x-hidden bg-slate-100 overflow-y-auto p-1">
            <section>
                <Accordion defaultIndex={[0]} className='last:mb-12'>
                    {allWindow.map((win: WindowTab, idx) => (
                        <AccordionItem key={idx} className="space-y-2 rounded-md bg-white shadow-md overflow-hidden w-full h-full">
                            <article className="font-semibold font-manrope justify-between max-w-full items-center flex">
                                <h4>
                                    <AccordionButton width={80}>
                                        <Box as='span' flex='1' textAlign='center'>
                                            {`window ${idx + 1}`}
                                        </Box>
                                    </AccordionButton>
                                </h4>
                                <Menu win_id={win.id} closeWins={closeWins}  />
                            </article>

                            <AccordionPanel>
                                {win.tabs.map((tab: TabType) => (
                                    <Tab
                                        key={tab.id}
                                        logo={tab.favIconUrl || ""}
                                        title={tab?.title}
                                        active={tab.active}
                                        tabId={tab.id}
                                        colorCode={filterTabs.includes(tab.id!)}
                                    />
                                ))
                                }
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </main>
    )
}

export const Tab = ({ logo, title, active, tabId, colorCode }: { logo: string, tabId: any, colorCode: boolean, title: string | undefined, active: boolean }) => {
    const [selTab, setSelected] = useState<any>(new Set());
    
    const handleSwitchTab = (tabId: any) => {
        chrome.tabs.update(tabId, { active: true });
    };
    
    const selectTab = (e: any, id: any) => {
        e.preventDefault();
        const updatedSet = new Set([...selTab, id]);
    
        // Update the selected tabs state
        setSelected(updatedSet);
        
        // Store the updated tabs in Chrome storage
        chrome.storage.local.get('filterTabs', (result) => {
            const storedTabs = result.filterTabs || [];
            const updatedTabs = [...new Set([...storedTabs, ...Array.from(updatedSet)])]; // Avoid duplicates
            chrome.storage.local.set({ filterTabs: updatedTabs });
        });
    }
    return (
        <article
            onContextMenu={(e) => selectTab(e, tabId)}
            onClick={() => handleSwitchTab(tabId)}
            className={`${active && 'shadow-md px-1 border rounded-md'} ${colorCode && 'bg-yellow-200'} tab ${selTab.has(tabId) ? 'bg-yellow-100': ''}`}>
            <div className="w-4 h-4">
                <img src={logo} alt='' />
            </div>
            <div className="flex-1 font-medium flex items-center justify-between">
                <p className="overflow-hidden whitespace-nowrap">{title?.length && title.length > 70 ? title.slice(0, 70)+'...' : title ?? ''} </p>
                {active && <p className="bg-gray-800 rounded-md p-1 text-xs font-medium text-slate-50">Active</p>}
                {selTab.has(tabId) && <p className="rounded-md border shadow-sm bg-slate-50/70 p-1 text-xs font-medium text-gray-400">selected</p>}
            </div>
        </article>
    )
}

export const Menu = ({win_id, closeWins}: {win_id: any, closeWins: (id: any) => void}) => {

    const handleMinimize = (id: any) => {
        chrome.windows.update(id, { state: 'minimized' });
    }

    const createTab = (id: any) => {
        chrome.tabs.create({windowId: id, url: 'chrome://newtab', active: true });
    }
    return (
        <div className="flex items-center space-x-2">
            <Tooltip hasArrow label='New tab' bg='gray.600' className="text-white">
                <button onClick={() => createTab(win_id)} className="menu-bar">
                    <span className="fluent--form-new-20-filled"></span>
                </button>
            </Tooltip>
            <Tooltip hasArrow label='Minimize window' bg='gray.600' className="text-white">
                <button className="menu-bar" onClick={() => handleMinimize(win_id)}>
                    <span className="solar--minimize-square-minimalistic-outline"></span>
                </button>
            </Tooltip>
            <Tooltip hasArrow label='Close window' bg='gray.600' className="text-white">
                <button className="menu-bar" onClick={() => closeWins(win_id)}>
                    <span className="ri--close-circle-line"></span>
                </button>
            </Tooltip>
        </div>
    )
}

export default Main;
