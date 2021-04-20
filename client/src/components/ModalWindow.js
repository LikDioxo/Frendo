import React from 'react';
import "../assets/css/modal.css";



function ModalWindow({show, component})
{
    const showClassHideName = show ? "modal display-block" : "modal display-none";
    if (show)
    {
        return (
            <div className={showClassHideName}>
                <div className="modal-main">
                {component}
            </div>
            </div>
        )
    }
    return null

}

export default ModalWindow
