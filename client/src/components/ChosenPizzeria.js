import React from "react";
import "../assets/css/chosen-pizzeria.css";


function ChosenPizzeria({onChange, pizzeria_address, order_count}) {

    return (
        <div className="chosen-pizzeria shadowed">
            <div className="chosen-pizzeria-address-box">
                <div className="chosen-pizzeria-title">Выбранная пиццерия:</div>
                <div className="chosen-pizzeria-address">{pizzeria_address}</div>
            </div>
            <div className="chosen-pizzeria-order-box">
                <div className="chosen-pizzeria-order-title">Заказов в очереди:</div>
                <div className="chosen-pizzeria-order-count">{order_count}</div>
            </div>
            <button className="chosen-pizzeria-change-button default-button" onClick={onChange}>
                Сменить
            </button>
        </div>
    );
}


export default ChosenPizzeria;
