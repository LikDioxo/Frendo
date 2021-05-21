import React, {useEffect} from "react";
import OrderItem from "../components/OrderItem";
import {useDispatch} from "react-redux";
import {
    changePizzaInOrder,
    decreaseSelectedPizzaQuantity,
    deletePizzaFromOrder,
    increaseSelectedPizzaQuantity
} from "../actions";
import "../assets/css/order_list.css";
import ReactTooltip from "react-tooltip";


function OrderList({ordered_pizzas})
{
    const dispatch = useDispatch();
    useEffect(() => {
        ReactTooltip.rebuild();
    });

    return (
        <div className="order-list">
            {ordered_pizzas.map((pizza)=>
                (<OrderItem
                    image_name={pizza.image_name}
                    name={pizza.name}
                    quantity={pizza.quantity}
                    price={pizza.price}
                    events={pizza.events}
                    ingredients={pizza.ingredients}
                    onItemIncrease={() => {dispatch(increaseSelectedPizzaQuantity(pizza.order_id))}}
                    onItemDecrease={() => {dispatch(decreaseSelectedPizzaQuantity(pizza.order_id))}}
                    onItemDelete={() => {dispatch(deletePizzaFromOrder(pizza.order_id))}}
                    onItemChange={() => {dispatch(changePizzaInOrder(pizza.order_id))}}
            />))}
            <ReactTooltip className="shadowed"
                          id="custom-pizza"
                          type="light"
                          textColor="#f1a54d"
                          effect="solid"
                          delayShow={500}
                          offset={{left: 20}}/>

        </div>
    );
}


export default OrderList
