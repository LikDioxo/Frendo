import React from "react";
import OrderItem from "../components/OrderItem";

function OrderList({ordered_pizzas})
{

    return (
        <div className="order-list">
            {ordered_pizzas.map((pizza)=>
                (<OrderItem
                    image_name={pizza.image_name}
                    name={pizza.name}
                    quantity={pizza.quantity}
                    price={pizza.price}
            />))}
        </div>

    );
}



export default OrderList



