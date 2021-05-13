import React from "react";
import "../assets/css/pizza_card.css"
import {formatIngredients} from "../utils"

function PizzaCard({image_name, name, ingredients, price, onPizzaSelect}) {


    let show_ingredients = formatIngredients(ingredients.filter((el)=>{return (el.status === 0 || el.status === 1)}))
    console.log(show_ingredients)

    return (
        <div className="pizza-card shadowed" onClick={onPizzaSelect}>
            <div className="pizza-image-wrapper">
                <img src={"http://127.0.0.1:8000/images/pizzas/"+image_name} alt=""/>
            </div>
            <div className="pizza-name">{name}</div>
            <div className="pizza-ingredients">
                {show_ingredients}
            </div>
            <div className="pizza-footer-wrapper">
                <div className="pizza-price">{price} грн.</div>
                <button className="pizza-choose-button default-button" onClick={onPizzaSelect}>Выбрать</button>
            </div>
        </div>

    );
}


export default PizzaCard;
