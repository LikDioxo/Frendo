import React, {useCallback} from 'react';
import HeaderImage from "../components/HeaderImage";
import logo from "../assets/images/logo.jpg";
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
            <HeaderImage image_path={logo}/>
            <SearchBox onFilterView={changeFilterView}/>
            <OrderHelpBox onOrderHelp={() => alert("Здесь должно быть модальное окно!!!")}/>
        </div>
    )
}
export default Header
