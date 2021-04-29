import React from "react";
import Header from "./Header";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import {withRouter} from "react-router";
import "../assets/css/faq_page.css";


function FAQPage()
{
    return (
        <div className="content">
            <Header />
            <div className="page faq-box double-shadowed">
                <h1>FAQ - Часто задаваемые вопросы</h1>
                <div className="question-box">
                    <FAQ question="Как заказать пиццу?" steps={[
                        "На главной страничке выберите пиццерию",
                        "На новой странице нажмите на понравившуюся пиццу"
                    ]}/>
                    <FAQ question="Как узнать номер в очереди?" steps={[

                    ]}/>
                    <FAQ question="Как изменить заказ?" steps={[

                    ]}/>
                </div>
            </div>
            <Footer />
        </div>
    );
}


export default withRouter(FAQPage);
