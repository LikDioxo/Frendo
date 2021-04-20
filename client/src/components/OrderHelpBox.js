import React from 'react';

function OrderHelpBox({onOrderHelp})
{
    return (<div className="header-image">
            <p>Уже сделали заказ?</p>
            <button className="button" onClick={onOrderHelp}>Узнать номер в очереди</button>
        </div>
    )
}



export default OrderHelpBox