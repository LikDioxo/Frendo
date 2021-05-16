import React from "react";
import ModalWindow from "../components/ModalWindow";
import AuthenticationModal from "../components/AuthenticationModal";
import {useDispatch, useSelector} from "react-redux";
import {authenticateUser} from "../actions";
import {useHistory} from "react-router";
import {isLoading} from "../selectors";
import Loading from "../components/Loading";


function AuthenticationPage()
{
    let history = useHistory();
    const loading = useSelector(isLoading);
    const dispatch = useDispatch()
    const handleEnter = (username, password, role) => {
        dispatch(authenticateUser(username, password, role, history))
    };

    if (loading) {
        return <Loading/>
    }

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


export default AuthenticationPage
