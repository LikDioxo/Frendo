import React from 'react';


function OperatorOrderItem({
    order_id
})
{
    return (
        <div className="operator-order-item">
            <div className="operator-order-item-info-wrapper">
                <div className="operator-order-item-order-id-title">
                    Номер заказа:
                </div>
                <div className="operator-order-item-order-id">
                    {order_id}
                </div>
            </div>
            <div className="operator-order-item-info-wrapper">
                <div className="operator-order-item-order-id-title">
                    Номер телефона клиента:
                </div>
                <div className="operator-order-item-order-id">
                    {order_id}
                </div>
            </div>
            <div className="operator-order-item-info-wrapper">
                <div className="operator-order-item-order-id-title">
                    Номер заказа:
                </div>
                <div className="operator-order-item-order-id">
                    {order_id}
                </div>
            </div>
            <div className="operator-order-item-info-wrapper">
                <div className="operator-order-item-order-id-title">
                    Номер заказа:
                </div>
                <div className="operator-order-item-order-id">
                    {order_id}
                </div>
            </div>
        </div>
    )
}


export default OperatorOrderItem;
