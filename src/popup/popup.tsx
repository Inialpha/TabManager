import ReactDOM from 'react-dom';

function Popup() {
  return (
    <div>
      <h1>Popup Page</h1>
      <p>This is a React-based popup!</p>
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('root'));

