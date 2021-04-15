import React from 'react';
import HeaderImage from "./HeaderImage";
import logo from "../assets/logo.jpg";

function Header()
{
    return (<div className="header">
            <HeaderImage image_path={logo}/>
        </div>
    )
}
export default Header
