import React from "react";
import OrderItem from "../components/OrderItem";
import {useDispatch} from "react-redux";
import {decreaseSelectedPizzaQuantity, deletePizzaFromOrder, increaseSelectedPizzaQuantity} from "../actions";
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
                    onItemIncrease={() => {dispatch(increaseSelectedPizzaQuantity(pizza.id))}}
                    onItemDecrease={() => {dispatch(decreaseSelectedPizzaQuantity(pizza.id))}}
                    onItemDelete={() => {dispatch(deletePizzaFromOrder(pizza.id))}}
            />))}
        </div>
    );
}


export default OrderList
