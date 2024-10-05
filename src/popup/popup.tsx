import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAllTabs } from '../utils/tabs';


export type TabType = chrome.tabs.Tab;

function Popup() {  
  const [tabs, setTabs] = useState<TabType[]>([]);
  const [filterTab, setFilterTab] = useState<number[]>([])

  useEffect(() => {
      const fetchTabs = async () => {
          const fetchedTabs = await getAllTabs();
          setTabs(fetchedTabs);
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
      <Header onSearch={handleSearch} />
      <Main allTabs={tabs} filterTabs={filterTab} />
      <Footer allTabs={tabs} />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <Popup />
  </ChakraProvider>
);

