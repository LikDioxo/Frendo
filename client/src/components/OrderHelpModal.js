import React, {useRef} from "react";
import "../assets/css/order_help_modal.css";


function OrderHelpModal({onModalSubmit})
{
    let number = useRef("");
    let onSubmitCallback = () => {onModalSubmit(number.current.value)}

    return (
        <div className="order-help-modal rounded-container">
            <div className="order-help-modal-title">
                Узнать номер в очереди
            </div>
            <div className="order-help-modal-phone-number-title">Номер телефона: </div>
            <input className="default-input-bar order-help-modal-phone-number" type="tel" pattern="[0-9]{12}" ref={number}/>
            <button className="order-help-modal-submit default-button" onClick={onSubmitCallback}>Отправить</button>
        </div>
    )

}


export default OrderHelpModal
