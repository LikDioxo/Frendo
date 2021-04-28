import React from "react";
import Header from "./Header";
import Footer from "../components/Footer";
import {withRouter} from "react-router";



function FAQPage() {
;
    return (
        <div className="content">
            <Header />
            <div className="page">
            <h1>FAQ</h1>
                <ol>
                    <li>Как заказать пиццу?</li>
                    <li>Как узнать номер в очереди?</li>
                    <li>Как изменить заказ?</li>
                </ol>
            </div>
            <Footer />
        </div>
    );
}


export default withRouter(FAQPage);