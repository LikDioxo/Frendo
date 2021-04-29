import React from 'react';
import HeaderImage from "../components/HeaderImage";
import SearchBox from "../components/SearchBox";
import Cart from "../components/Cart";
import {flipFilterView} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import OrderHelpBox from "../components/OrderHelpBox";
import {getOrder} from "../selectors";
import "../assets/css/header.css"


function Header()
{
    const dispatch = useDispatch()
    const changeFilterView = () => {
        dispatch(flipFilterView());
    }

    const order = useSelector(getOrder);
    const orderCount = order.length ? order.reduce((acc, cur_it)=>acc+cur_it.quantity):0;

    return (
        <div className="header">
            <HeaderImage/>
            <SearchBox onFilterView={changeFilterView}/>
            <OrderHelpBox onOrderHelp={() => alert("Здесь должно быть модальное окно!!!")}/>
            <Cart orderCount={orderCount}/>
        </div>
    )
}


export default Header
