import "../assets/css/pizzeria_choice_modal.css"
import {useSelector} from "react-redux";
import {getSelectedPizza} from "../selectors";
import {formatIngredients} from "../utils";


function PizzaModal()
{
    const pizza = useSelector(getSelectedPizza);
    let show_ingredients = []

    for (const ingredient in pizza.ingredients) {
        show_ingredients.push({
            id: ingredient,
            name: pizza.ingredients[ingredient].name,
            flag: pizza.ingredients[ingredient].flag,
            status: pizza.ingredients[ingredient].status,
            price: pizza.ingredients[ingredient].price
        })

    }



    const necessary_ingredients = formatIngredients(show_ingredients.filter((el)=>(el.status === 0)));
    const optional_ingredients = show_ingredients.filter((el)=>(el.status === 1));
    const additional_ingredients = show_ingredients.filter((el)=>(el.status === 2));

    return (
        <div className="pizzas-selected-box">
            <div className="pizza-large-img">
                <img alt="тут картинка"/>
                <div>Стоимость: {pizza.price}</div>
            </div>
            <div className="selected-pizza-wrapper">
                <div>Пицца "{pizza.name}"</div>
                <div>{pizza.size} см, {pizza.weight} г</div>
                <div>{necessary_ingredients}</div>
                <div>Опциональные ингредиенты</div>
                <div>
                    {
                        optional_ingredients.map((el)=>(
                            <div>
                                <input type="checkbox" checked={el.flag}/>
                                <div>{el.name}</div>
                            </div>

                        ))

                    }
                </div>
                <div>Добавить пиццу</div>
                <div>
                    {
                        additional_ingredients.map((el)=>(
                            <div>
                                <input type="checkbox" checked={el.flag}/>
                                <div>{el.name}</div>
                                <div>{el.price}</div>
                            </div>

                        ))

                    }
                </div>
                <button>Добавить в корзину</button>
            </div>
        </div>
    )
}


export default PizzaModal
