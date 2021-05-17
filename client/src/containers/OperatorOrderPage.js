import React from "react";
import OperatorHeader from "../components/OperatorHeader";
import {useSelector} from "react-redux";
import {getDetailOrder} from "../selectors";
import OperatorOrderDetails from "../components/OperatorOrderDetails";
import OperatorOrderDetailsPizzaList from "../components/OperatorOrderDetailsPizzaList";


function OperatorOrderPage()
{
    let detail_order = useSelector(getDetailOrder);

    return (
        <div className="content">
            <OperatorHeader/>
            <div className="page">
                <OperatorOrderDetails
                    order_id={detail_order.id}
                    delivery_address={detail_order.delivery_address}
                    phone_number={detail_order.customers_phone_number}
                    total_price={detail_order.total_price}
                    onStatusPressed
                    onPrintPressed
                />
                <OperatorOrderDetailsPizzaList  choices={detail_order.choices}/>
            </div>
        </div>
    )
}


export default OperatorOrderPage
