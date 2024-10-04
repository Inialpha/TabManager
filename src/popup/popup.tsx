import ReactDOM from 'react-dom';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';

function Popup() {
  return (
    <div className='flex flex-col h-[80vh] w-[600px] font-manrope'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('root'));

