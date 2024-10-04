import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

function Popup() {
  return (
    <div className='flex flex-col w-[600px] font-manrope'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <Popup />
  </ChakraProvider>
);

