import React from "react";
import "../assets/css/pizza_card.css"



function OrderItem({image_name,
                       name,
                       quantity,
                       price
                       // onItemChange,
                       // onItemDelete,
                       // onItemIncrease,
                       // onItemDecrease
})
{


    return (
        <div className="order-item">
            <div className="img-wrapper">
                {image_name}
            </div>
            <div>
                {name}
            </div>
            <div className="quantity-wrapper">
                <div>Количество</div>
                <div className="quantity-button-wrapper">
                    <div></div>
                    <div>{quantity}</div>
                    <div></div>
                </div>
            </div>
            <div>Цена: {price}грн</div>
            <div>
                <button>Удалить</button>
                <button>Изменить состав</button>
            </div>
        </div>

    );
}



export default OrderItem
