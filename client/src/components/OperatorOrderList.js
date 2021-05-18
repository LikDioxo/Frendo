import React from "react";
import OperatorOrderItem from "./OperatorOrderItem";
import "../assets/css/operator_order_list.css";
import {useDispatch, useSelector} from "react-redux";
import {
    flipUpdateAvailablePizzasModalView,
    setDetailOrder,
    setUpdatedOrder,
    updatePizzeriaOrderStatus
} from "../actions";
import {useHistory} from "react-router";
import {currentUserSelector} from "../selectors";


function OperatorOrderList({orders})
{
    const dispatch = useDispatch();

    let operator_id = useSelector(currentUserSelector).user_id;

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
                         status
                         }, index) =>
                (<OperatorOrderItem
                    key={index}
                    order_id={id}
                    phone_number={customers_phone_number}
                    delivery_address={delivery_address}
                    pizza_quantity={quantities[id]}
                    order_status={status}
                    onStatusPressed={(order_status) => {
                        dispatch(flipUpdateAvailablePizzasModalView())
                        dispatch(setUpdatedOrder(id, order_status))}
                    }
                    onDetailsPressed={()=>dispatch(setDetailOrder(orders[index], history))}
            />))}

        </div>

    )
}


export default OperatorOrderList
