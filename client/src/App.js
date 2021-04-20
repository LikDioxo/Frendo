import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

import Header from "./containers/Header";
import {createStore} from "redux";
import {Provider} from "react-redux";
import mainReducer from "./reducers";
import Post from "./components/Post";


const store = createStore(mainReducer);
function App() {

    return (
      <Provider store={store}>
        <div className="App">
          <Header/>
            <Post onChoosePizzeria={() => alert("Тут должно быть модальное окно")}/>
        </div>
      </Provider>
    );
}

export default App;
