import {useDispatch, useSelector} from "react-redux";
import React, {useCallback} from "react";
import {flipPizzeriasModalView, setChosenPizzeria} from "../actions";
import {getChosenPizzeria, getPizzeriasModalView, getWelcomePost} from "../selectors";
import Header from "./Header";
import ModalWindow from "../components/ModalWindow";
import PizzeriaChoiceModal from "../components/PizzeriaChoiceModal";
import Post from "../components/Post";
import Footer from "../components/Footer";

import ChosenPizzeria from "../components/ChosenPizzeria";


function ClientStartPage() {
    const dispatch = useDispatch();
    const handlePizzeriasModal = useCallback(
        () => dispatch(flipPizzeriasModalView()),
        [dispatch]
    );
    const handlePizzeriaChosen = useCallback((data) => {
        dispatch(setChosenPizzeria(data[0], data[1], data[2]));
        dispatch(flipPizzeriasModalView());
    },
    [dispatch]
    );
    const PizzeriasModalView = useSelector(getPizzeriasModalView);
    const WelcomePost = useSelector(getWelcomePost);
    const Pizzeria = useSelector(getChosenPizzeria);


    return (
        <div className="content">
            <Header />
            <div className="page">
                {Pizzeria.chosen ?
                    <ChosenPizzeria
                        pizzeria_address={Pizzeria.pizzeria_address}
                        order_count={Pizzeria.orders_count}
                        onChange={handlePizzeriasModal}
                    /> : null
                }
                <ModalWindow
                    handleClose={handlePizzeriasModal}
                    show={PizzeriasModalView}
                    component={
                        <PizzeriaChoiceModal
                            onPizzeriaChosen={handlePizzeriaChosen}
                            addresses={
                                [
                                    [42,"Донбасс", 448],
                                    [43,"пвапвапвап", 448],
                                    [44,"ваырпыапры", 45488],
                                    [45,"парвыпраы", 487],
                                    [46,"апвррвп", 4586],
                                    [47,"Давпорвыпар", 45678],
                                    [48,"ырпаыврап", 6578],
                                    [49,"варыпвр", 6575]
                                ]}
                        />
                    }
                />
                {WelcomePost?<Post onChoosePizzeria={handlePizzeriasModal} />:null}
            </div>
            <Footer />
        </div>
    );
}


export default ClientStartPage;