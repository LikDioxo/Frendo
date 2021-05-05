import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import createSagaMiddleware from 'redux-saga';

import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import mainReducer from "./reducers";

import ClientStartPage from "./containers/ClientStartPage";
import FAQPage from "./containers/FAQPage";
import "./assets/css/main.css";
import rootSaga from "./sagas";




const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    mainReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

function App() {

  return (
      <Provider store={store}>
          <BrowserRouter>
              <Route exact path={'/'} component={ClientStartPage}/>
              <Route path={'/FAQ'} component={FAQPage}/>

          </BrowserRouter>
      </Provider>
  );
}

export default App;
