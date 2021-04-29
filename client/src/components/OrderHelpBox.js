import React from 'react';
import "../assets/css/order_help_box.css"


function OrderHelpBox({ onOrderHelp })
{
    return (
        <div className="order-help-box shadowed">
            <p className="order-help-p">Уже сделали заказ?</p>
            <button className="order-help-button default-button" onClick={onOrderHelp}>
                Узнать номер в очереди
            </button>
        </div>
    );
}


export default OrderHelpBox
