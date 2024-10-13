import './App.css'
import Tab from '../src/assets/snapshot.png'

function App() {

  return (
    <>
      <div className='font-manrope flex items-center my-20 flex-col space-y-6 w-2/3 mx-auto'>
        <h1 className='text-4xl font-black'>Tab Manager</h1>
        <p className='text-lg text-center'>
          With TManager your browser has never been easier
          and efficient. Save, sort and manage hundreds of tabs
          on a simple interface.
        </p>
        <section className='flex justify-between items-center'> 
          <div className='w-1/2'>
            <img src={Tab} alt="Tab Manager" />
          </div>
          <div className='w-[45%]'>
            <h2 className='text-2xl font-semibold'>Features</h2>
            <ul className='text-sm space-y-4 ml-4 list-inside list-disc marker:text-sky-400'>
              <li>Save tabs for later</li>
              <li>Organize tabs by Hostname</li>
              <li>Search for tabs</li>
              <li>Open multiple tabs at once</li>
              <li>Close duplicate empty tabs</li>
              <li>Close least recently used Tabs when you get to limit</li>
              <li>No more 100+ Tab, Set Tab Limit</li>
            </ul>
          </div>
        </section>
        <button className='rounded-lg bg-gray-800 text-white font-medium px-4 py-2'>Learn more</button>
      </div>
    </>
  )
}

export default App
