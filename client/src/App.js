import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

import Header from "./containers/Header";
import './App.css';
import {createStore} from "redux";
import {Provider} from "react-redux";
import mainReducer from "./reducers";

console.log("ASFAFASFSDFGASGDS")
const store = createStore(mainReducer);
function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Header/>
        </div>
      </Provider>
  );
}

export default App;
