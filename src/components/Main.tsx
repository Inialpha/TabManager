import { Tooltip } from "@chakra-ui/react"
import { createTab } from '../utils/tabs'
import { Accordion, AccordionButton, AccordionPanel, Box, AccordionItem } from "@chakra-ui/react"
import { TabType } from "../popup/popup"


const Main = ({allTabs, filterTabs}: {allTabs: TabType[], filterTabs: number[]}) => {

    return (
        <main className="border flex-1 h-[80vh] overflow-x-hidden bg-slate-100 overflow-y-auto p-1">
            <section className="space-y-2 rounded-md bg-white mb-6 shadow-md overflow-hidden w-full h-full ">
                <Accordion defaultIndex={[0]}>
                    <AccordionItem>
                        <article className="font-semibold font-manrope justify-between max-w-full items-center flex">
                            <h4>
                                <AccordionButton width={80}>
                                    <Box as='span' flex='1' textAlign='center'>
                                        Chrome Window 1
                                    </Box>
                                </AccordionButton>
                            </h4>
                            <Menu />
                        </article>
                        
                        <AccordionPanel>
                            {allTabs.map((tab: TabType) => (
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
                </Accordion>
            </section>
        </main>
    )
}

export const Tab = ({ logo, title, active, tabId, colorCode }: { logo: string, tabId: any, colorCode: boolean, title: string | undefined, active: boolean }) => {
    const handleSwitchTab = (tabId: any) => {
        chrome.tabs.update(tabId, { active: true });
    };

    return (
        <article
            onClick={() => handleSwitchTab(tabId)}
            className={`${active && 'shadow-md px-1 border rounded-md'} ${colorCode && 'bg-yellow-200'} flex hover:bg-blue-300 text-sm space-x-2 cursor-pointer items-center w-full py-1`}>
            <div className="w-4 h-4">
                <img src={logo} alt='' />
            </div>
            <div className="flex-1 font-medium flex items-center justify-between">
                <p className="overflow-hidden whitespace-nowrap">{title?.length && title.length > 70 ? title.slice(0, 70)+'...' : title ?? ''} </p>
                {active && <p className="bg-gray-800 rounded-md p-1 text-xs font-medium text-slate-50">Active</p>}
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
                <button onClick={() => createTab('')} className="menu-bar">
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
