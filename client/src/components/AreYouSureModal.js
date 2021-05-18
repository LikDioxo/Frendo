import React from "react";
import question from "../assets/images/are-you-sure.png";
import "../assets/css/are_you_sure_modal.css";


function AreYouSureModal({
    onDeny,
    onConfirm
})
{
    return (
        <div className="are-you-sure-modal rounded-container">
            <div className="are-you-sure-modal-image-wrapper">
                <img src={question} alt="Вы уверены?"/>
            </div>
            <div className="are-you-sure-modal-buttons-wrapper">
                <button
                    className="default-denying-button operator-button are-you-sure-modal-no"
                    onClick={onDeny}
                >Нет</button>
                <button
                    className="default-button operator-button are-you-sure-modal-yes"
                    onClick={onConfirm}
                >Да</button>
            </div>
        </div>
    )
}


export default AreYouSureModal
