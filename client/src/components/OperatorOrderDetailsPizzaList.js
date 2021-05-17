import React from "react";
import OperatorOrderDetailPizzaItem from "./OperatorOrderDetailPizzaItem";
import "../assets/css/operator_order_details_pizza_list.css";


function OperatorOrderDetailsPizzaList({choices})
{
    return (
        <div className="operator-order-details-pizza-list">
            {choices.map(({name, quantity, price, events})=>
                (<OperatorOrderDetailPizzaItem
                    name={name}
                    quantity={quantity}
                    price={price}
                    ingredients={events}
                />))}

        </div>
    )
}


export default OperatorOrderDetailsPizzaList
