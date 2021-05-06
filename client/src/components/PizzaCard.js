import React from "react";



function PizzaCard({image_name, name, ingredients, price, onPizzaSelect}) {


    let show_ingredients = ingredients
        .filter((el)=>{return (el.status === 0 || el.status === 1)})
        .map((el) => {return el.name.toLowerCase()});
    if(show_ingredients.length !== 0){
        show_ingredients[0] = show_ingredients[0].charAt(0).toUpperCase() + show_ingredients[0].slice(1);
        show_ingredients = show_ingredients.join(", ");
    }
    return (
        <div className="pizza-card" onClick={onPizzaSelect}>
            <div className="pizza-image-wrapper">
                <img src={image_name} alt=""/>
            </div>
            <div>{name}</div>
            <div className="ingredients">
                {show_ingredients}
            </div>
            <div>
                <div>{price}</div>
                <button onClick={onPizzaSelect}>Выбрать</button>
            </div>
        </div>

    );
}


export default PizzaCard;