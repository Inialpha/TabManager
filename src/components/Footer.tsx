import { removeTab } from '../utils/tabs';
import { WindowTab } from '../utils/windows';
import './icons.css';
import { Tooltip } from '@chakra-ui/react';

const Footer = ({allWindow, Open}: {allWindow: WindowTab[], Open: () => void}) => {
    
    const handleRemove = async () => {
        await allWindow.forEach((win) => {
            if (win.tabs) {
                removeTab(win.tabs[0].id!);
            }
        });
    }

    return (
        <footer className="font-manrope fixed w-full bottom-0 border border-t-gray-500 shadow-inner bg-white p-1">
            <ul className="flex items-center justify-between">
                <li>
                    <Tooltip hasArrow label='New window' bg='gray.600' className="text-white">
                        <button className="task-bar">
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