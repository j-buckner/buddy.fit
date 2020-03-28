import React from 'react';
import './scss/App.scss';
import Home from './Home'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/dashboard">
          <span>
            Sign in
          </span>
        </a>
      </header>
      <div className="App-wrapper">
        <Home/>
      </div>
    </div>
  );
}

export default App;
