import React from "react";
import "../assets/css/operator_order_details.css";


function OperatorOrderDetails({
    order_id,
    delivery_address,
    phone_number,
    total_price,
    onStatusPressed,
    onPrintPressed
})
{
    return (
        <div className="operator-order-details double-shadowed rounded-container">
            <div className="operator-order-details-title">
                Заказ
            </div>
            <div className="operator-order-details-id">
                Номер заказа: {order_id}
            </div>
            <div className="operator-order-details-delivery-address">
                Адресс доставки: {delivery_address}
            </div>
            <div className="operator-order-details-phone-number">
                Номер телефона: {phone_number}
            </div>
            <div className="operator-order-details-total-price">
                Суммарная цена: {total_price}
            </div>
            <select
                className="operator-order-details-status default-denying-button operator-button"
                onClick={onStatusPressed}
            >
                <option selected hidden>Статус</option>
                <option>Готовится</option>
                <option>Уже готово</option>
                <option>В службе доставки</option>
            </select>
            <button
                className="operator-order-details-print default-button operator-button"
                onClick={onPrintPressed}
            >
                Распечатать
            </button>
        </div>
    )
}


export default OperatorOrderDetails
