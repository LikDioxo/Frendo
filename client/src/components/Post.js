import React from 'react';
import welcome_img from "../assets/images/welcome-img.jpg";
import "../assets/css/post.css";


function Post({ onChoosePizzeria }) {
    return (
            <div className="welcome-post double-shadowed">
                <div className="welcome-img">
                    <img src={welcome_img} alt="welcome-pizzas-img" />
                </div>
                <div className="welcome-content">
                    <h3>Приветствуем Вас в сети<br/> пиццерий Frendo</h3>
                    <p>
                        Чтобы посмотреть доступные товары или сделать заказ, выберите
                        пиццерию
                    </p>
                    <button className="post-button default-button" onClick={onChoosePizzeria}>
                        Выбрать пиццерию
                    </button>
                </div>
            </div>
    );
}


export default Post
