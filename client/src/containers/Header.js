import React from 'react';
import HeaderImage from "../components/HeaderImage";
import SearchBox from "../components/SearchBox";
import Cart from "../components/Cart";
import {flipOrderHelpModalView, getOrderInfo} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import OrderHelpBox from "../components/OrderHelpBox";
import {getOrder, getOrderHelpModalView} from "../selectors";
import ModalWindow from "../components/ModalWindow";
import OrderHelpModal from "../components/OrderHelpModal";
import "../assets/css/header.css"


function Header()
{
    const dispatch = useDispatch()

    const handleOrderHelpModal = () => {
        dispatch(flipOrderHelpModalView())
    }
    const handleGetOrderInfo = (phone_number) => {
        dispatch(getOrderInfo(phone_number))
    }

    const order = useSelector(getOrder)
    const OrderHelpModalView = useSelector(getOrderHelpModalView)

    const show_order = []
    for (const item in order.ordered_pizzas) {
        show_order.push({
                quantity: order.ordered_pizzas[item].quantity
            }
        )
    }
    let orderCount = 0;
    if(show_order.length)
    {
        for(const el of show_order)
        {
            orderCount += el.quantity
        }
    }


    return (
        <div className="header">
            <HeaderImage/>
            <SearchBox/>
            <OrderHelpBox onOrderHelp={handleOrderHelpModal}/>
            <Cart orderCount={orderCount}/>

            <ModalWindow
                handleClose={handleOrderHelpModal}
                show={OrderHelpModalView}
                component={<OrderHelpModal
                    onModalSubmit={handleGetOrderInfo}
                />}
            />
        </div>
    )
}


export default Header
