import React from "react";
import OperatorOrderItem from "./OperatorOrderItem";
import "../assets/css/operator_order_list.css";


function OperatorOrderList({orders})
{

    let quantities = {};
    for (let order of orders) {
        // console.log(order);
        quantities[order.id] = 0;
        for (let choice of order.choices) {
            // console.log(choice);
            quantities[order.id] += choice.quantity;
        }
    }

    return (
        <div className="operator-order-list">
            {orders.map(({id,
                         customers_phone_number,
                         delivery_address}) =>
                (<OperatorOrderItem
                    order_id={id}
                    phone_number={customers_phone_number}
                    delivery_address={delivery_address}
                    pizza_quantity={quantities[id]}
            />))}

        </div>

    )
}


export default OperatorOrderList
