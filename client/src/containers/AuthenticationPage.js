import React from "react";
import ModalWindow from "../components/ModalWindow";
import AuthenticationModal from "../components/AuthenticationModal";
import {useDispatch} from "react-redux";
import {authenticateUser} from "../actions";



function AuthenticationPage()
{
    const dispatch = useDispatch()


    const handleEnter = (username, password, role) => {
        dispatch(authenticateUser(username, password, role))
    };
    return (
        <div className="content">
            <div className="page">
                <ModalWindow
                    show={true}
                    handleClose={null}
                    component={<AuthenticationModal
                        onEnter={handleEnter}
                    />}
                />
            </div>
        </div>
    )
}

export default AuthenticationPage