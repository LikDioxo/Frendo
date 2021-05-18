import React, {useRef} from "react";
import "../assets/css/operator_order_details.css";


function OperatorOrderDetails({
    order_id,
    delivery_address,
    phone_number,
    total_price,
    order_status,
    onStatusPressed,
    onPrintPressed
})
{
    let status = useRef();

    let onStatusPressedCallback = () => onStatusPressed(status.current.options[status.current.selectedIndex].value);

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
                onChange={onStatusPressedCallback}
                ref={status}
            >
                <option selected={order_status === 0} hidden={order_status > 0}>Статус</option>
                <option value={1} selected={order_status === 1} >Готовится</option>
                <option value={2} selected={order_status === 2} >Уже готово</option>
                <option value={3} selected={order_status === 3} >В службе доставки</option>
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
