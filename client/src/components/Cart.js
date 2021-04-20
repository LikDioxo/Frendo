import React, {useCallback} from 'react';
import {useSelector} from "react-redux";
import cart_image from "../assets/images/cart.png"
import {useDispatch} from "react-redux";


function Cart()
{
    const dispatch = useDispatch()
    return (
        <div className="cart" onClick={}>
            <div className="cart-image">
                <img src={cart_image} alt="Корзина"/>
            </div>
            <p></p>
        </div>
    )
}

export default Cart
