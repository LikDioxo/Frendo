import React from 'react';
import "../assets/css/operator_order_item.css";


function OperatorOrderItem({
    order_id,
    phone_number,
    delivery_address,
    pizza_quantity,
    onStatusPressed,
    onDetailsPressed
})
{
    return (
        <div className="operator-order-item rounded-container double-shadowed">
            <div className="operator-order-item-info operator-order-item-id-wrapper">
                <div className="operator-order-item-order-id-title">
                    Номер заказа:
                </div>
                <div className="operator-order-item-order-id">
                    {order_id}
                </div>
            </div>
            <div className="operator-order-item-info operator-order-item-phone-number-wrapper">
                <div className="operator-order-item-phone-number-title">
                    Номер телефона клиента:
                </div>
                <div className="operator-order-item-phone-number">
                    {phone_number}
                </div>
            </div>
            <div className="operator-order-item-info operator-order-item-delivery-address-wrapper">
                <div className="operator-order-item-delivery-address-title">
                    Адрес доставки:
                </div>
                <div className="operator-order-item-delivery-address">
                    {delivery_address}
                </div>
            </div>
            <div className="operator-order-item-info operator-order-item-pizza-quantity-wrapper">
                <div className="operator-order-item-pizza-quantity-title">
                    Количество пицц:
                </div>
                <div className="operator-order-item-pizza-quantity">
                    {pizza_quantity}
                </div>
            </div>
            <div className="operator-order-item-controls-wrapper">
                <select
                    className="operator-order-item-status default-button operator-button"
                    onClick={onStatusPressed}
                >
                    <option selected hidden>Статус</option>
                    <option>Готовится</option>
                    <option>Уже готово</option>
                    <option>В службе доставки</option>
                </select>
                <button
                    className="operator-order-item-details default-button operator-button"
                    onClick={onDetailsPressed}
                >
                    Детальнее
                </button>
            </div>
        </div>
    )
}


export default OperatorOrderItem;
