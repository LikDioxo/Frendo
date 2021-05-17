import React from "react";
import OperatorOrderItem from "./OperatorOrderItem";
import "../assets/css/operator_order_list.css";


function OperatorOrderList({orders})
{
    console.log(orders);
    return (
        <div className="operator-order-list">
            {orders.map(({id,
                         customers_phone_number,
                         delivery_address,
                         choices}) =>
                (<OperatorOrderItem
                    order_id={id}
                    phone_number={customers_phone_number}
                    delivery_address={delivery_address}
                    pizza_quantity={choices.length}
            />))}

        </div>

    )
}


export default OperatorOrderList
