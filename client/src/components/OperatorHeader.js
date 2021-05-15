import React from 'react';
import logo from '../assets/images/logo.png';
import "../assets/css/operator_header.css";


function OperatorHeader({
    onOrdersClick,
    onPizzasClick,
    onLogout,
    pizzeria_address,
    pizzeria_workload
})
{
    return (
        <div className="operator-header">
            <div className="operator-header-logo-wrapper">
                <img src={logo} alt="Логотип"/>
            </div>
            <div className="operator-header-sections-wrapper">
                <button
                    className="operator-header-orders default-button"
                    onClick={onOrdersClick}
                >Заказы</button>
                <button
                    className="operator-header-pizzas default-button"
                    onClick={onPizzasClick}
                >Пиццы</button>
            </div>
            <div className="operator-header-pizzeria-info-wrapper">
                <div className="operator-header-pizzeria-address-title">
                    Пиццерия:
                </div>
                <div className="operator-header-pizzeria-address">
                    {pizzeria_address}
                </div>
                <div className="operator-header-pizzeria-workload-title">
                    Заказов в очереди:
                </div>
                <div className="operator-header-pizzeria-workload">
                    {pizzeria_workload}
                </div>
            </div>
            <button
                className="operator-header-logout default-button"
                onClick={onLogout}
            >
                Выйти
            </button>
        </div>
    )
}


export default OperatorHeader;
