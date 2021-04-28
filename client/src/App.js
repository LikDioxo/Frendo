import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";


import { createStore } from "redux";
import { Provider } from "react-redux";
import mainReducer from "./reducers";

import ClientStartPage from "./containers/ClientStartPage";
import FAQPage from "./containers/FAQPage";



const store = createStore(mainReducer);
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
