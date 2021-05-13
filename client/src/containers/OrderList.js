import React from "react";
import OrderItem from "../components/OrderItem";
import {useDispatch} from "react-redux";
import {
    changePizzaInOrder,
    decreaseSelectedPizzaQuantity,
    deletePizzaFromOrder,
    increaseSelectedPizzaQuantity
} from "../actions";
import "../assets/css/order_list.css";


function OrderList({ordered_pizzas})
{
    const dispatch = useDispatch();

    return (
        <div className="order-list">
            {ordered_pizzas.map((pizza)=>
                (<OrderItem
                    image_name={pizza.image_name}
                    name={pizza.name}
                    quantity={pizza.quantity}
                    price={pizza.price}
                    onItemIncrease={() => {dispatch(increaseSelectedPizzaQuantity(pizza.order_id))}}
                    onItemDecrease={() => {dispatch(decreaseSelectedPizzaQuantity(pizza.order_id))}}
                    onItemDelete={() => {dispatch(deletePizzaFromOrder(pizza.order_id))}}
                    onItemChange={() => {dispatch(changePizzaInOrder(pizza.order_id))}}
            />))}
        </div>
    );
}


export default OrderList
