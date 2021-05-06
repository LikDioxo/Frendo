import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect} from "react";
import {flipPizzeriasModalView, getPizzerias, setChosenPizzeria} from "../actions";
import {getChosenPizzeria, getPizzeriasModalView, getPizzeriasSelector, getWelcomePost} from "../selectors";
import Header from "./Header";
import ModalWindow from "../components/ModalWindow";
import PizzeriaChoiceModal from "../components/PizzeriaChoiceModal";
import Post from "../components/Post";
import Footer from "../components/Footer";

import ChosenPizzeria from "../components/ChosenPizzeria";
import PizzasContainer from "./PizzasContainer";


function ClientStartPage() {
    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(getPizzerias())
    },[dispatch])

    const handlePizzeriasModal = () => dispatch(flipPizzeriasModalView());

    const handlePizzeriaChosen = ({id, address, workload}) => {
        dispatch(setChosenPizzeria(id, address, workload));
        dispatch(flipPizzeriasModalView());
    };

    const PizzeriasModalView = useSelector(getPizzeriasModalView);
    const WelcomePost = useSelector(getWelcomePost);
    const Pizzeria = useSelector(getChosenPizzeria);
    const Pizzerias = useSelector(getPizzeriasSelector)



    return (
        <div className="content">
            <Header />
            <div className="page">
                {Pizzeria.chosen ?
                    <>
                        <ChosenPizzeria
                            pizzeria_address={Pizzeria.pizzeria_address}
                            order_count={Pizzeria.orders_count}
                            onChange={handlePizzeriasModal}
                        />
                        <PizzasContainer pizzeria_id={Pizzeria.pizzeria_id}/>
                    </>
                        : null
                }
                <ModalWindow
                    handleClose={handlePizzeriasModal}
                    show={PizzeriasModalView}
                    component={
                        <PizzeriaChoiceModal
                            onPizzeriaChosen={handlePizzeriaChosen}
                            addresses={Pizzerias}
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