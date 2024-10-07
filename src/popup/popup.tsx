import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAllTabs } from '../utils/tabs';
import { getOpenWindows, WindowTab } from '../utils/windows';
import OptionsPage from './option';


export type TabType = chrome.tabs.Tab;

function Popup() {  
  const [tabs, setTabs] = useState<TabType[]>([]);
  const [filterTab, setFilterTab] = useState<number[]>([])
  const [wins, setWins] = useState<WindowTab[]>([]);
  const [view, setView] = useState<'popup' | 'options'>('popup');

  const openOptionsPage = () => {
    setView('options');
  }

  const goBack = () => {
    setView('popup');
  }

  useEffect(() => {
      const fetchTabs = async () => {
          const fetchedTabs = await getAllTabs();
          const fetchedWindows = await getOpenWindows();
          setTabs(fetchedTabs);
          setWins(fetchedWindows);
      };
      fetchTabs();
  }, []);

  const handleSearch = (searchQuery: string) => {
    const matchingTabs = tabs
    .filter((tab) => tab.title?.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((tab) => tab.id!)
    setFilterTab(searchQuery ? matchingTabs : []);
  }

  return (
    <div className='flex flex-col w-[600px] font-manrope'>
      {view === 'popup' ? (
        <>
          <Header onSearch={handleSearch} />
          <Main allWindow={wins} filterTabs={filterTab} />
          <Footer allWindow={wins} Open={openOptionsPage} />
        </>): (
          <OptionsPage onBack={goBack} /> 
        )}
      
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <Popup />
  </ChakraProvider>
);

