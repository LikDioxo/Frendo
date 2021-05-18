import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOperatorPizzeriaSelector, getOrdersForPizzeriaSelector} from "../selectors";
import {logoutUser} from "../actions";
import {useHistory, useLocation} from "react-router";
import logo from '../assets/images/logo.png';
import Loading from "./Loading";
import "../assets/css/operator_header.css";


function OperatorHeader()
{
    const history = useHistory();
    const dispatch = useDispatch();
    let location = useLocation().pathname;

    let onLogout = () => {
        dispatch(logoutUser())
        history.push('/authenticate')
    }

    let onPizzasClick = () => {
        history.push('/operator/pizzas')
    }

    let onOrdersClick = () => {
        history.push('/operator')
    }

    let pizzeria = useSelector(getOperatorPizzeriaSelector);
    let orders = useSelector(getOrdersForPizzeriaSelector);
    let pizzeria_workload = Object.values(orders).length;

    if (pizzeria === undefined) {
        return <Loading />
    }

    return (
        <div className="operator-header">
            <div className="operator-header-logo-wrapper">
                <img src={logo} alt="Логотип"/>
            </div>
            <div className="operator-header-sections-wrapper">
                <button
                    className={
                        "operator-header-orders default-button operator-button "
                        + (location === "/operator" ? "default-denying-button" : "")}
                    onClick={onOrdersClick}
                >Заказы</button>
                <button
                    className={
                        "operator-header-pizzas default-button operator-button "
                        + (location === "/operator/pizzas" ? "default-denying-button" : "")}
                    onClick={onPizzasClick}
                >Пиццы</button>
            </div>
            <div className="operator-header-pizzeria-info-wrapper">
                <div className="operator-header-pizzeria-info-item">
                    <div className="operator-header-pizzeria-address-title">
                        Пиццерия:
                    </div>
                    <div className="operator-header-pizzeria-address">
                        {pizzeria.address}
                    </div>
                </div>
                <div className="operator-header-pizzeria-info-item">
                    <div className="operator-header-pizzeria-workload-title">
                        Заказов в очереди:
                    </div>
                    <div className="operator-header-pizzeria-workload">
                        {pizzeria_workload}
                    </div>
                </div>
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


export default OperatorHeader;
