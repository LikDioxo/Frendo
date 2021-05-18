import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    flipPizzaSelection,
    resetPizzaSelection,
    setAvailablePizzas,
    flipUpdateAvailablePizzasModalView,
    startPizzaLoading,
    endPizzaLoading
} from "../actions";
import "../assets/css/operator_pizzas.css";
import {isLoading} from "../selectors";
import Loading from "./Loading";


function OperatorPizzas({
    pizzas
}) {
    const dispatch = useDispatch()

    const show_pizzas = []
    const fetch_pizzas = []
    for (const pizza of Object.keys(pizzas)) {
        show_pizzas.push({
            id: pizza,
            name: pizzas[pizza].pizza_name,
            flag: pizzas[pizza].is_available
        })
        fetch_pizzas.push({
            id: pizza,
            is_available: pizzas[pizza].is_available
        })
    }

    const handleReset = () => {
        dispatch(resetPizzaSelection());
    }

    const handleAccept = () => {
        if (fetch_pizzas.length !== 0) {
            dispatch(setAvailablePizzas(fetch_pizzas));
            dispatch(flipUpdateAvailablePizzasModalView());
        } else {
            handleReset();
        }
    }


    return (
        <div className="operator-pizzas double-shadowed rounded-container">
            <div className="operator-pizzas-title">
                Пиццы
            </div>
            <div className="operator-pizzas-wrapper">
                {show_pizzas.map(({id, name, flag}) => {
                    return (<div className="operator-pizzas-pizza-wrapper">
                        <label htmlFor={id}>{name}</label>
                        <input type="checkbox" id={id} onClick={() => {
                            dispatch(startPizzaLoading());
                            dispatch(flipPizzaSelection(id));
                            dispatch(endPizzaLoading());
                        }} checked={flag}/>
                    </div>)
                })}
            </div>
            <div className="operator-pizzas-buttons-wrapper">
                <button className="operator-pizzas-clear default-denying-button operator-button" onClick={handleReset}>Сбросить</button>
                <button className="operator-pizzas-accept default-button operator-button" onClick={handleAccept}>Применить</button>
            </div>
        </div>
    )
}


export default  OperatorPizzas
