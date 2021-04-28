import React from "react";
import HeaderImage from "../components/HeaderImage";
import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-text">
        <h2>почта: frendopizza@gmail.com</h2>

        <h2>телефон: 8 800 555 3535</h2>
      </div>
      <div className="footer-image">
        <HeaderImage />
      </div>

      <div className="footer-text">
        <a href="">
            <Link exact to="/FAQ"><h2>FAQ</h2></Link>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
