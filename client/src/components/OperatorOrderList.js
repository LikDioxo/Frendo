import React from "react";
import OperatorOrderItem from "./OperatorOrderItem";
import "../assets/css/operator_order_list.css";
import {useDispatch} from "react-redux";
import {setDetailOrder} from "../actions";
import {useHistory} from "react-router";


function OperatorOrderList({orders})
{
    const dispatch = useDispatch();
    let history = useHistory();
    let quantities = {};
    for (let order of orders) {
        quantities[order.id] = 0;
        for (let choice of order.choices) {
            quantities[order.id] += choice.quantity;
        }
    }

    return (
        <div className="operator-order-list">
            {orders.map(({id,
                         customers_phone_number,
                         delivery_address,
                         }, index) =>
                (<OperatorOrderItem
                    key={index}
                    order_id={id}
                    phone_number={customers_phone_number}
                    delivery_address={delivery_address}
                    pizza_quantity={quantities[id]}
                    onDetailsPressed={()=>dispatch(setDetailOrder(orders[index], history))}
            />))}

        </div>

    )
}


export default OperatorOrderList
