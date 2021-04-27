import React, {useCallback} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

import Header from "./containers/Header";
import {createStore} from "redux";
import {Provider, useDispatch, useSelector} from "react-redux";
import mainReducer from "./reducers";
import Post from "./components/Post";
import ModalWindow from "./components/ModalWindow";
import PizzeriaChoiceModal from "./components/PizzeriaChoiceModal";
import { flipPizzeriasModalView} from "./actions";
import {getPizzeriasModalView} from "./selectors";




function App() {

    const dispatch = useDispatch();
    const handlePizzeriasModal = useCallback(() => dispatch(flipPizzeriasModalView()),
        [dispatch])
    const PizzeriasModalView = useSelector(getPizzeriasModalView);
    return (
        <div className="App">
          <Header/>
            <ModalWindow handleClose={handlePizzeriasModal} show={PizzeriasModalView} component={<PizzeriaChoiceModal addresses={[["Донбасс", 42]]}/>}/>
            <Post onChoosePizzeria={handlePizzeriasModal}/>

        </div>

    );
}

export default App;
