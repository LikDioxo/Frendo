import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    flipPizzaSelection,
    getPizzeriaPizzasByOperator,
    updatePizzeriaAvailablePizzas,
    resetPizzaSelection
} from "../actions";
import "../assets/css/operator_pizzas.css";
import {getAvailablePizzasSelector} from "../selectors";
import Loading from "./Loading";


function OperatorPizzas({
    operator_id,
    pizzas
})
{
    const dispatch = useDispatch()

    const show_pizzas = []
    const fetch_pizzas = []
    for (const pizza of Object.keys(pizzas)) {
        show_pizzas.push({
            id: pizza,
            name: pizzas[pizza].pizza_name,
            flag: pizzas[pizza].is_available
        })
        if (pizzas[pizza].is_available) {
            fetch_pizzas.push(pizza)
        }
    }
    const handleReset = () =>
    {
        dispatch(resetPizzaSelection());
        // dispatch(getPizzeriaPizzasByOperator(operator_id));
    }

    const handleAccept = () => {
        if(fetch_pizzas.length !== 0)
        {
            dispatch(updatePizzeriaAvailablePizzas(operator_id, fetch_pizzas))
        }
        else
        {
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
                            dispatch(flipPizzaSelection(id));
                        }} checked={flag}/>
                    </div>)
                })}
            </div>
            <div className="operator-pizzas-buttons-wrapper">
                <button  className="operator-pizzas-clear default-denying-button" onClick={handleReset}>Сбросить</button>
                <button className="operator-pizzas-accept default-button" onClick={handleAccept}>Применить</button>
            </div>
        </div>
    )
}


export default  OperatorPizzas
