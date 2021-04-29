import React from 'react';
import "../assets/css/modal.css";
import close_icon from "../assets/images/close_icon.png"


function ModalWindow({show, component, handleClose})
{
    const showClassHideName = show ? "modal display-block" : "modal display-none";
    if (show) {
        return (
            <div className={showClassHideName}>

                <div className="modal-main">
                    <div className="close" onClick={handleClose}>
                        <img className="close-icon" src={close_icon} alt=""/>
                    </div>
                    {component}
                </div>
            </div>
        );
    }

    return null;
}


export default ModalWindow
