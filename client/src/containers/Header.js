import React, {useCallback} from 'react';
import HeaderImage from "../components/HeaderImage";
import logo from "../assets/images/logo.jpg";
import SearchBox from "../components/SearchBox";
import {flipFilterView} from "../actions";
import {useDispatch} from "react-redux";


function Header()
{
    const dispatch = useDispatch()
    const changeFilterView = useCallback(() => {
        dispatch(flipFilterView());
    },[dispatch])
    return (<div className="header">
            <HeaderImage image_path={logo}/>
            <SearchBox onFilterView={changeFilterView}/>
        </div>
    )
}
export default Header
