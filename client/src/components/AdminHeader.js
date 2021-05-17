import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector, getOperatorPizzeriaSelector} from "../selectors";
import {logoutUser} from "../actions";
import {useHistory, useLocation} from "react-router";
import logo from '../assets/images/logo.png';

import "../assets/css/operator_header.css";


function AdminHeader()
{
    const dispatch = useDispatch();
    const history = useHistory();

    let onLogout = () => {
        dispatch(logoutUser())
        history.push('/authenticate')
    }
    let user = useSelector(currentUserSelector);



    return (
        <div className="operator-header">
            <div className="operator-header-logo-wrapper">
                <img src={logo} alt="Логотип"/>
            </div>
           <div>
               Добро пожаловать: Admin{user.id}
           </div>
            <button
                className="operator-header-logout default-button operator-button"
                onClick={onLogout}
            >
                Выйти
            </button>
        </div>
    )
}


export default AdminHeader;
