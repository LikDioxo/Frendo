import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeOrder} from "../actions";
import {getChosenPizzeria, getOrder} from "../selectors";
// import "../assets/css/order_submit_modal.css"


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
        <div className="order-submit-modal">
            <div>Оформить заказ</div>
            <div>Номер телефона: </div>
            <input
                className="default-input-bar"
                ref={phone_number}
                type="tel"
                pattern="[0-9]{12}"
            />
            <div>Адресс доставки: </div>
            <input
                className="default-input-bar"
                ref={address}
            />
            <button className="default-button" onClick={handleOrderSubmit}>Оформить</button>
        </div>
    )
}


export default OrderSubmitModal;
