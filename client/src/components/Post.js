import React from 'react';
import welcome_img from "../assets/images/welcome-img.jpg";
import "../assets/css/style.css";

function Post({ onChoosePizzeria }) {
    return (
        <div align="center">
            <div className="welcome-post">
                <div className="welcome-img">
                    <img src={welcome_img} alt="welcome-pizzas-img" />
                </div>
                <div className="welcome-content">
                    <h3>Приветствуем Вас в сети пиццерий Frendo</h3>
                    <p>
                        Чтобы посмотреть доступные товары или сделать заказ, выберите
                        пиццерию
                    </p>
                    <button className="button-filter" onClick={onChoosePizzeria}>
                        Выбрать пиццерию
                    </button>
                </div>
            </div>
        </div>
    );
}



export default Post