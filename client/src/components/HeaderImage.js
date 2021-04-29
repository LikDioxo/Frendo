import React from 'react';
import logo from "../assets/images/logo.png";
import "../assets/css/header_image.css"


function HeaderImage()
{
    return (
        <div className="header-image">
            <img src={logo} alt="Логотип"/>
        </div>
    );
}


export default HeaderImage
