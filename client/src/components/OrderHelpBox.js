import React from 'react';



function OrderHelpBox({ onOrderHelp }) {
    return (
        <div align="center" className="search-box">
            <p className="search-p">Уже сделали заказ?</p>
            <button className="button-filter" onClick={onOrderHelp}>
                Узнать номер в очереди
            </button>
        </div>
    );
}

export default OrderHelpBox