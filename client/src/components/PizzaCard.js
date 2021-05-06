import React from "react";



function PizzaCard({image_name, name, ingredients, price, onPizzaSelect}) {


    const perm_ingredients = ingredients.filter((el)=>{return el.status === 0});
    return (
        <div className="pizza-card" onClick={onPizzaSelect}>
            <div className="pizza-image-wrapper">
                <img src={image_name} alt=""/>
            </div>
            <div>{name}</div>
            <div className="ingredients">
                {perm_ingredients.map(({name})=> (
                        <div>{name}</div>
                    ))
                }
            </div>
            <div>
                <div>{price}</div>
                <button onClick={onPizzaSelect}>Выбрать</button>
            </div>
        </div>

    );
}


export default PizzaCard;