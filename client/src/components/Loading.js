import React from 'react';
import loading_gif from "../assets/images/loading-test.gif"
import "../assets/css/main.css"
import ModalWindow from "./ModalWindow";

function Loading()
{
    return (
        <ModalWindow
            show={true}
            component={
                (<div className="loading-wrapper">
                    <img src={loading_gif} alt="Loading..."/>
                </div>)
            }
            handleClose={null}
            loading_modal={true}
        />
    );
}


export default Loading