import { removeTab } from '../utils/tabs';
import { WindowTab } from '../utils/windows';
import './icons.css';
import { Tooltip } from '@chakra-ui/react';

const Footer = ({allWindow, Open, createWins}: {allWindow: WindowTab[], createWins: () => void, Open: () => void}) => {
    const handleRemove = async () => {
        const select = await chrome.storage.local.get('filterTabs');
        if (select.filterTabs && select.filterTabs.length > 0) {
            // Remove each selected tab
            for (const tabId of select.filterTabs) {
                await removeTab(tabId);
            }
            chrome.storage.local.set({ filterTabs: [] });
        } else {
            const tabs = allWindow.map(win => win.tabs).flat();
            const activeTab = tabs.find(tab => tab.active);
            if (activeTab && activeTab.id) {
                await removeTab(activeTab.id);
            }
        }
    }
    return (
        <footer className="font-manrope fixed w-full bottom-0 border border-t-gray-500 shadow-inner bg-white p-1">
            <ul className="flex items-center justify-between">
                <li>
                    <Tooltip hasArrow label='New window' bg='gray.600' className="text-white">
                        <button onClick={createWins} className="task-bar">
                            <span className="fluent--window-new-16-regular"></span>
                        </button>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip hasArrow label='Save Sessions' bg='gray.600' className="text-white">
                        <button className="task-bar">
                            <span className="hugeicons--folder-file-storage"></span>
                        </button>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip hasArrow label='Set timer' bg='gray.600' className="text-white">
                        <button className="task-bar">
                            <span className="ion--timer-outline"></span>
                        </button>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip hasArrow label='Delete Active Tab' bg='gray.600' className="text-white">
                        <button className="task-bar" onClick={() => handleRemove()}>
                            <span className="fluent--delete-12-filled"></span>
                        </button>
                    </Tooltip>
                </li>
                <li>
                    <Tooltip hasArrow label='Settings' bg='gray.600' className="text-white">
                        <button onClick={Open} className="task-bar">
                            <span className="lsicon--setting-filled"></span>
                        </button>
                    </Tooltip>
                </li>                  
                <li>
                    <Tooltip hasArrow label='Change to Block View' bg='gray.600' className="text-white text-xs font-manrope">
                        <button className="task-bar">
                            <span className="typcn--th-list-outline"></span> 
                        </button>
                    </Tooltip>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;