import React, {useRef} from 'react';
import "../assets/css/operator_order_item.css";


function OperatorOrderItem({
    order_id,
    phone_number,
    delivery_address,
    pizza_quantity,
    order_status,
    onStatusPressed,
    onDetailsPressed
})
{
    let status = useRef();
    let onStatusPressedCallback = () => onStatusPressed(status.current.options[status.current.selectedIndex].value);

    console.log(order_status)
    console.log(order_status === 0)
    console.log(order_status === 1)
    console.log(order_status === 2)
    console.log(order_status === 3)

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
                    className="operator-order-item-status default-denying-button operator-button"
                    onChange={onStatusPressedCallback}
                    ref={status}
                >
                    <option selected={order_status === 0} hidden>Статус</option>
                    <option value={1} selected={order_status === 1} >Готовится</option>
                    <option value={2} selected={order_status === 2} >Уже готово</option>
                    <option value={3} selected={order_status === 3} >В службе доставки</option>
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
