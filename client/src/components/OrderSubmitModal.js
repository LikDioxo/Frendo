import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeOrder} from "../actions";
import {getChosenPizzeria, getOrder} from "../selectors";
import "../assets/css/order_submit_modal.css"


function OrderSubmitModal({total_price})
{
    const dispatch = useDispatch();

    let phone_number = useRef('');
    let address = useRef('');

    let selected_pizzeria = useSelector(getChosenPizzeria)
    let order = useSelector(getOrder)

    const handleOrderSubmit = () => {
        dispatch(makeOrder(
            selected_pizzeria.pizzeria_id,
            phone_number.current.value,
            address.current.value,
            total_price,
            order
        ))
    }

    return (
        <div className="order-submit-modal rounded-container">
            <div className="order-submit-modal-title">Оформить заказ</div>
            <div className="order-submit-modal-phone-number-title">Номер телефона: </div>
            <input
                className="order-submit-modal-phone-number default-input-bar"
                placeholder={"380XXXXXXXXX"}
                ref={phone_number}
                type="tel"
                pattern="[0-9]{12}"
            />
            <div className="order-submit-modal-address-title">Адресс доставки: </div>
            <input
                placeholder={"Ул. Победы 43/34"}
                className="order-submit-modal-address default-input-bar"
                ref={address}
            />
            <div className="order-submit-modal-total-price">
                Общая стоимость: {total_price} грн.
            </div>
            <button className="order-submit-modal-submit default-button" onClick={handleOrderSubmit}>Оформить</button>
        </div>
    )
}


export default OrderSubmitModal;
