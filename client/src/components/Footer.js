import React from "react";
import HeaderImage from "../components/HeaderImage";
import {Link} from "react-router-dom";
import "../assets/css/footer.css"


function Footer()
{
  return (
    <div className="footer">
      <div className="footer-text footer-info">
        <p>почта: frendopizza@gmail.com</p>
        <p>телефон: 8 800 555 3535</p>
      </div>
      <div className="footer-image">
        <HeaderImage />
      </div>
      <div className="footer-text footer-links">
        <a href="">
            <Link exact to="/FAQ">FAQ</Link>
        </a>
      </div>
    </div>
  );
}


export default Footer;
