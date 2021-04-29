import React from 'react';
import cart_image from "../assets/images/cart.png"
import "../assets/css/cart.css"


function Cart({orderCount})
{
    return (
        <div className="cart shadowed">
            <div className="cart-image">
                <img src={cart_image} alt="Корзина"/>
            </div>
            <p>{orderCount}</p>
        </div>
    );
}


export default Cart
