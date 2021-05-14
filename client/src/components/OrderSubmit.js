import React from 'react';
import "../assets/css/order_submit.css";


function OrderSubmit({order_price, onSubmit})
{
    return (
       <div className="order-submit-wrapper rounded-container double-shadowed">
           <div className="order-submit-price-wrapper">
               <div className="order-submit-price-title">Общая стоимость:</div>
               <div className="order-submit-price">{order_price} грн</div>
           </div>
        <button className="order-submit default-button" onClick={onSubmit}>Офромить заказ</button>
       </div>
    );
}


export default OrderSubmit
