import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [test, setTest] = React.useState(null);

  React.useEffect(() => {
    fetch('/users')
      .then(results => results.json())
      .then(data => setTest(JSON.stringify(data)));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {test}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
