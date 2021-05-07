import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {flipPizzeriasModalView, getIngredients, getPizzerias, setChosenPizzeria} from "../actions";
import {
    getChosenPizzeria,
    getIngredientsSelector,
    getPizzeriasModalView,
    getPizzeriasSelector,
    isFilterView
} from "../selectors";
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
        dispatch(getPizzerias());
        dispatch(getIngredients())
    },[dispatch])

    const handlePizzeriasModal = () => {
        dispatch(flipPizzeriasModalView());
    };
    const handlePizzeriaChange = () => {
        dispatch(flipPizzeriasModalView());
        dispatch(getPizzerias());
    }
    const handlePizzeriaChosen = ({id, address, workload}) => {
        dispatch(setChosenPizzeria(id, address, workload));
        dispatch(flipPizzeriasModalView());
    };

    const PizzeriasModalView = useSelector(getPizzeriasModalView);
    const Pizzeria = useSelector(getChosenPizzeria);
    const Pizzerias = useSelector(getPizzeriasSelector);
    const isFilter = useSelector(isFilterView);
    const Ingredients = useSelector(getIngredientsSelector);

    if(Pizzerias === undefined || Ingredients === undefined){
        return <Loading/>
    }


    return (
        <div className="content">
            <Header />
            <div className="page">
                {Pizzeria.chosen ?
                    <>
                        <ChosenPizzeria
                            pizzeria_address={Pizzeria.pizzeria_address}
                            order_count={Pizzeria.orders_count}
                            onChange={handlePizzeriaChange}
                        />
                        {isFilter ? <FilterBox pizzeria_id={Pizzeria.pizzeria_id} ingredients={Ingredients}/> : null}
                        <PizzasContainer pizzeria_id={Pizzeria.pizzeria_id}/>
                    </>
                        : <Post onChoosePizzeria={handlePizzeriasModal} />
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

            </div>
            <Footer />
        </div>
    );
}


export default ClientStartPage;