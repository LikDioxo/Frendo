import React, {useCallback} from 'react';
import HeaderImage from "../components/HeaderImage";
import SearchBox from "../components/SearchBox";
import {flipFilterView} from "../actions";
import {useDispatch} from "react-redux";
import OrderHelpBox from "../components/OrderHelpBox";


function Header()
{
    const dispatch = useDispatch()
    const changeFilterView = useCallback(() => {
        dispatch(flipFilterView());
    },[dispatch])
    return (<div className="header">
            <HeaderImage/>
            <SearchBox onFilterView={changeFilterView}/>
            <OrderHelpBox onOrderHelp={() => alert("Здесь должно быть модальное окно!!!")}/>
        </div>
    )
}
export default Header
