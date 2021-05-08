import React from 'react';
import cart_image from "../assets/images/cart.png"
import "../assets/css/cart.css"
import {Link} from "react-router-dom";


function Cart({orderCount})
{
    return (
        <Link exact to={"/cart"}>
            <div className="cart shadowed">
                <div className="cart-image">
                    <img src={cart_image} alt="Корзина"/>
                </div>
                <p>{orderCount}</p>
            </div>
        </Link>
    );
}


export default Cart
