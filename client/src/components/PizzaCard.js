import React from "react";
import "../assets/css/pizza_card.css"


function PizzaCard({image_name, name, ingredients, price, onPizzaSelect}) {
    const perm_ingredients = ingredients.filter((el)=>{return el.status === 0});

    let show_ingredients = ingredients
        .filter((el)=>{return (el.status === 0 || el.status === 1)})
        .map((el) => {return el.name.toLowerCase()});
    if(show_ingredients.length !== 0){
        show_ingredients[0] = show_ingredients[0].charAt(0).toUpperCase() + show_ingredients[0].slice(1);
        show_ingredients = show_ingredients.join(", ");
    }

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
                <div className="pizza-price">{price}</div>
                <button className="pizza-choose-button default-button" onClick={onPizzaSelect}>Выбрать</button>
            </div>
        </div>

    );
}


export default PizzaCard;
