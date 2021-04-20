import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

import Header from "./components/Header";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
    </div>
  );
}

export default App;
