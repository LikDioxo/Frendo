import React from "react";
import plus from "../assets/images/plus.png";
import minus from "../assets/images/minus.png";
import "../assets/css/operator_order_details_pizza_item.css";


function OperatorOrderDetailPizzaItem({
    name,
    quantity,
    price,
    ingredients
})
{
    return (
        <div className="operator-order-details-pizza-item rounded-container double-shadowed">
            <div className="details-pizza-name">
                {name}
            </div>
            <div className='details-ingredient-title'>
                Ингредиенты:
            </div>
            <div className="details-ingredient-wrapper">
                {ingredients.map((name, flag) => {
                    <div className="details-ingredient-name">
                        {name}
                    </div>
                    <div className="details-ingredient-flag">
                        <img src={flag ? plus : minus} alt="Флаг"/>
                    </div>
                })}
            </div>
            <div className="details-pizza-quantity">
                Количество: {quantity}
            </div>
            <div className="details-pizza-price">
                Цена: {price}
            </div>
        </div>
    )

}


export default OperatorOrderDetailPizzaItem
