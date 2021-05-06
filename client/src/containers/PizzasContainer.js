import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAvailablePizzas} from "../actions";
import {getAvailablePizzasSelector} from "../selectors";
import PizzaCard from "../components/PizzaCard";
import Loading from "../components/Loading";
import "../assets/css/pizzas_container.css"


function PizzasContainer({pizzeria_id}) {
    const dispatch = useDispatch()
    useEffect(() => {
            dispatch(getAvailablePizzas(pizzeria_id))
        },[dispatch, pizzeria_id])

    const Pizzas = useSelector(getAvailablePizzasSelector)
    if (Pizzas === undefined) {
        return (
            <Loading/>
        )
    }
    return (
        <div className="pizzas-wrapper">
            {Pizzas.map(({id,image_name, name, ingredients, price}) =>
                (<PizzaCard
                    key={id}
                    image_name={image_name}
                    name={name}
                    ingredients={ingredients}
                    price={price}
                    onPizzaSelect={() => alert(name)}
                />))}
        </div>

    );
}


export default PizzasContainer;
