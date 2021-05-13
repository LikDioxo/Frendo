import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAvailablePizzas, setSelectedPizza} from "../actions";
import {getAvailablePizzasSelector, isLoading} from "../selectors";
import PizzaCard from "../components/PizzaCard";
import Loading from "../components/Loading";
import Nothing from "../components/Nothing";
import "../assets/css/pizzas_container.css"


function PizzasContainer({pizzeria_id}) {
    const dispatch = useDispatch()
    useEffect(() => {
            dispatch(getAvailablePizzas(pizzeria_id))
        },[dispatch, pizzeria_id])

    const Pizzas = useSelector(getAvailablePizzasSelector)
    const loading = useSelector(isLoading);
    if (Pizzas === undefined || loading) {
        return (
            <Loading/>
        )
    }

    let pizza_cards = Pizzas.map((el) =>
        (<PizzaCard
            key={el.id}
            image_name={el.image_name}
            name={el.name}
            ingredients={el.ingredients}
            price={el.price}
            onPizzaSelect={(event) => {
                dispatch(setSelectedPizza(el))
                event.stopPropagation();
            }}
        />));

    return (
        <div className="pizzas-wrapper">
            {Pizzas.length !== 0 ? pizza_cards : <Nothing text="По вашему запросу не найдено ни одну пиццу."/>}
        </div>
    );
}


export default PizzasContainer;
