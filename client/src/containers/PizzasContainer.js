import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAvailablePizzas} from "../actions";
import {getAvailablePizzasSelector} from "../selectors";
import PizzaCard from "../components/PizzaCard";

function PizzasContainer({pizzeria_id}) {
    const dispatch = useDispatch()
    useEffect(() => {
            dispatch(getAvailablePizzas(pizzeria_id))
        },[])

    const Pizzas = useSelector(getAvailablePizzasSelector)
    if (Pizzas !== undefined) {
        return (

            <div className="pizzas-wrapper">
                {Pizzas.map(({image_name, name, ingredients, price}) =>
                    (<PizzaCard
                        image_name={image_name}
                        name={name}
                        ingredients={ingredients}
                        price={price}
                        onPizzaSelect={() => alert(name)}
                    />))}
            </div>

        );
    }
    return null
}


export default PizzasContainer;