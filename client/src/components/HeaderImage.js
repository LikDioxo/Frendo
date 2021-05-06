import React from 'react';
import logo from "../assets/images/logo.png";
import "../assets/css/header_image.css"
import {Link} from "react-router-dom";


function HeaderImage()
{
    return (
        <div className="header-image">
            <Link to={"/"}>
                <img src={logo} alt="Логотип"/>
            </Link>
        </div>
    );
}


export default HeaderImage
