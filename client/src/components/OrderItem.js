import React from "react";
import minus_image from "../assets/images/minus.png";
import plus_image from "../assets/images/plus.png";
import "../assets/css/order_item.css";


function OrderItem(
    {
        image_name,
        name,
        quantity,
        price
        // onItemChange,
        // onItemDelete,
        // onItemIncrease,
        // onItemDecrease
    }
)
{
    return (
        <div className="order-item double-shadowed rounded-container">
            <div className="order-item-image-wrapper">
                <img src={`http://127.0.0.1:8000/images/pizzas/${image_name}`}/>
            </div>
            <div className="order-item-name-wrapper">
                <div className="order-item-name-title">Пицца</div>
                <div className="order-item-name">{name}</div>
            </div>
            <div className="order-item-quantity-wrapper">
                <div className="order-item-quantity-title">Количество</div>
                <div className="order-item-quantity-button-wrapper">
                    <div className="order-item-quantity-minus-wrapper">
                        <img src={minus_image}/>
                    </div>
                    <div className="order-item-quantity">{quantity}</div>
                    <div className="order-item-quantity-plus-wrapper">
                        <img src={plus_image}/>
                    </div>
                </div>
            </div>
            <div className="order-item-price-wrapper">
                <div className="order-item-price-title">Цена</div>
                <div className="order-item-price">{price} грн</div>
            </div>
            <div className="order-item-buttons-wrapper">
                <button className="order-item-remove default-denying-button">Удалить</button>
                <button className="order-item-change default-button">Изменить состав</button>
            </div>
        </div>

    );
}


export default OrderItem
