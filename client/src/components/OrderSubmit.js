import React from 'react';



function OrderSubmit({order_price})
{
    return (
       <div>
        <div>Общая стоимость: {order_price} грн</div>
        <button>Офромить заказ</button>
       </div>
    );
}

export default OrderSubmit

