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
import CartPage from "./containers/CartPage";
import AuthenticationPage from "./containers/AuthenticationPage";
import RoleDependentRoutes from "./containers/RoleDependentRoutes";
import Toast from "./containers/Toast";






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
              <Route exact path={'/cart'} component={CartPage}/>
              <Route exact path={'/authenticate'} component={AuthenticationPage}/>
              <Route exact path={'/FAQ'} component={FAQPage}/>
              <RoleDependentRoutes/>
              <Toast/>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
