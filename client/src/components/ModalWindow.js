import React from 'react';
import close_icon from "../assets/images/close_icon.png";
import "../assets/css/modal.css";


function ModalWindow({show, component, handleClose, loading_modal=false})
{
    const showClassHideName = show ? "modal display-block" : "modal display-none";
    const Modal = loading_modal ? showClassHideName+" loading-modal" : showClassHideName;

    if (show) {
        return (
            <div className={Modal}>

                <div className="modal-main">
                    {handleClose !== null ?
                        <div className="close" onClick={handleClose}>
                            <img className="close-icon" src={close_icon} alt=""/>
                        </div> : null
                    }
                    {component}
                </div>
            </div>
        );
    }

    return null;
}


export default ModalWindow
