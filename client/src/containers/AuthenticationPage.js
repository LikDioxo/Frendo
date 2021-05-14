import React from "react";
import ModalWindow from "../components/ModalWindow";
import AuthenticationModal from "../components/AuthenticationModal";
import {useDispatch} from "react-redux";
import {authenticateUser} from "../actions";
import {useHistory, withRouter} from "react-router";



function AuthenticationPage()
{
    let history = useHistory();
    const dispatch = useDispatch()
    const handleEnter = (username, password, role) => {
        dispatch(authenticateUser(username, password, role, history))
    };

    return (
        <div className="content">
            <div className="page">
                <ModalWindow
                    show={true}
                    handleClose={null}
                    loading_modal={true}
                    component={<AuthenticationModal
                        onEnter={handleEnter}
                    />}
                />
            </div>
        </div>
    )
}

export default withRouter(AuthenticationPage)