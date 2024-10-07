import '../App.css';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
//import Settings from '../components/Settings';

function Options() {
  return (
    <>
      <div className='bg-slate-100'>
        <header>
          <h1>Tab Manager</h1>
        </header>
      </div>
    </>
  );
}

createRoot(document.getElementById('#root')!)
.render(
  <ChakraProvider>
    <Options />
  </ChakraProvider>
)

