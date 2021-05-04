import React from "react";



function ChosenPizzeria({onChange, pizzeria_address, order_count}) {


    return (
        <div className="chosen-pizzeria">
            <h2>Выбранная пиццерия</h2>
            <p>{pizzeria_address}</p>
            <p>Заказов в очереди: </p>
            <p>{order_count}</p>
            <button className="change-button" onClick={onChange}>
                Сменить
            </button>
        </div>
    );
}


export default ChosenPizzeria;