import React, {useCallback} from 'react';
import HeaderImage from "../components/HeaderImage";
import SearchBox from "../components/SearchBox";
import Cart from "../components/Cart";
import {flipFilterView} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import OrderHelpBox from "../components/OrderHelpBox";
import {getOrderCount} from "../selectors";


function Header()
{
    const dispatch = useDispatch()
    const changeFilterView = useCallback(() => {
        dispatch(flipFilterView());
    },[dispatch])

    const orderCount = useSelector(getOrderCount);

    return (<div className="header">
            <HeaderImage/>
            <SearchBox onFilterView={changeFilterView}/>
            <OrderHelpBox onOrderHelp={() => alert("Здесь должно быть модальное окно!!!")}/>
            <Cart orderCount={orderCount}/>
        </div>
    )
}
export default Header
