import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAvailablePizzas, setSelectedPizza} from "../actions";
import {getAvailablePizzasSelector, isLoading} from "../selectors";
import PizzaCard from "../components/PizzaCard";
import Loading from "../components/Loading";
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
    return (
        <div className="pizzas-wrapper">
            {Pizzas.map((el) =>
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
                />))}
        </div>

    );
}


export default PizzasContainer;
