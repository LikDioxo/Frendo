import React from "react";
import minus_image from "../assets/images/minus.png";
import plus_image from "../assets/images/plus.png";
import "../assets/css/order_item.css";
import {formatIngredients} from "../utils";


function OrderItem(
    {
        image_name,
        name,
        quantity,
        price,
        events,
        ingredients,
        onItemChange,
        onItemDelete,
        onItemIncrease,
        onItemDecrease
    }
)
{


    const ingr = Object.values(ingredients);
    const optional_ingredients = ingr.filter((el)=>(el.status === 1 && !el.flag));
    const additional_ingredients = ingr.filter((el)=>(el.status === 2 && el.flag));
    const optional = "<h5>Опциональные ингредиенты</h5>" + optional_ingredients.map((el) => "<p>" + "-" + el.name + "</p>").join("");
    const additional = "<h5>Дополнительные ингредиенты</h5>" + additional_ingredients.map((el) => "<p>" + "+" + el.name + "</p>").join("");
    let choices = "";
    if(optional_ingredients.length > 0)
    {
        choices += optional
    }
    if(additional_ingredients.length > 0)
    {
        choices += additional
    }



    return (
        <div data-for={events.length > 0 ? "custom-pizza": ""} data-tip={choices} data-html={true}
              className="order-item double-shadowed rounded-container">
            <div className="order-item-image-wrapper">

                <img src={`http://127.0.0.1:8000/images/pizzas/${image_name}`}/>
            </div>
            <div className="order-item-name-wrapper">
                <div className="order-item-name-title">Пицца</div>
                <div className="order-item-name">{name + (events.length>0 ? "*":"")}</div>

            </div>
            <div className="order-item-quantity-wrapper">
                <div className="order-item-quantity-title">Количество</div>
                <div className="order-item-quantity-button-wrapper">
                    <div className="order-item-quantity-minus-wrapper">
                        <button onClick={onItemDecrease}>
                            <img src={minus_image}/>
                        </button>
                    </div>
                    <div className="order-item-quantity">{quantity}</div>
                    <div className="order-item-quantity-plus-wrapper">
                        <button onClick={onItemIncrease}>
                            <img src={plus_image}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="order-item-price-wrapper">
                <div className="order-item-price-title">Цена</div>
                <div className="order-item-price">{price} грн</div>
            </div>
            <div className="order-item-buttons-wrapper">
                <button className="order-item-remove default-denying-button" onClick={onItemDelete}>
                    Удалить
                </button>
                <button className="order-item-change default-button" onClick={onItemChange}>
                    Изменить состав
                </button>
            </div>
        </div>

    );
}


export default OrderItem
