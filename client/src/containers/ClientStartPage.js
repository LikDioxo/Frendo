import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {flipPizzeriasModalView, getPizzerias, setChosenPizzeria} from "../actions";
import {getChosenPizzeria, getPizzeriasModalView, getPizzeriasSelector, isFilterView} from "../selectors";
import Header from "./Header";
import ModalWindow from "../components/ModalWindow";
import PizzeriaChoiceModal from "../components/PizzeriaChoiceModal";
import Post from "../components/Post";
import Footer from "../components/Footer";

import ChosenPizzeria from "../components/ChosenPizzeria";
import PizzasContainer from "./PizzasContainer";
import Loading from "../components/Loading";
import FilterBox from "./FilterBox";


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
    const Pizzeria = useSelector(getChosenPizzeria);
    const Pizzerias = useSelector(getPizzeriasSelector);
    const isFilter = useSelector(isFilterView)


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
                        {isFilter ? <FilterBox pizzeria_id={Pizzeria.pizzeria_id}/> : null}
                        <PizzasContainer pizzeria_id={Pizzeria.pizzeria_id}/>
                    </>
                        : <Post onChoosePizzeria={handlePizzeriasModal} />
                }
                {Pizzerias !== undefined ?
                <ModalWindow
                    handleClose={handlePizzeriasModal}
                    show={PizzeriasModalView}
                    component={
                        <PizzeriaChoiceModal
                            onPizzeriaChosen={handlePizzeriaChosen}
                            addresses={Pizzerias}
                        />
                    }
                /> : <Loading/>
                }

            </div>
            <Footer />
        </div>
    );
}


export default ClientStartPage;