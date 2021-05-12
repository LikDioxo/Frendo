import {useDispatch, useSelector} from "react-redux";
import {getSelectedPizza} from "../selectors";
import {formatIngredients} from "../utils";
import "../assets/css/pizza_modal.css";
import {addPizzaToOrder} from "../actions";


function PizzaModal()
{
    const dispatch = useDispatch();
    const pizza = useSelector(getSelectedPizza);

    let show_ingredients = []
    const handleAddPizzaToCart = () => {
        dispatch(addPizzaToOrder(pizza))
    }

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
        <div className="selected-pizza-wrapper">
            <div className="selected-pizza">
                <div className="selected-pizza-image-wrapper">
                    <img src={`http://127.0.0.1:8000/images/pizzas/${pizza.image_name}`} alt={`Картика пиццы: ${pizza.name}`}/>
                </div>
                <div className="selected-pizza-info">
                    <div className="selected-pizza-name">
                        Пицца "{pizza.name}"
                    </div>
                    <div className="selected-pizza-common-info">
                        {pizza.size} см, {pizza.weight} г
                    </div>
                    <div className="selected-pizza-necessary-ingredients">
                        {necessary_ingredients}
                    </div>
                    <div className="selected-pizza-ingredients-wrapper">
                        <div className="ingredients-type-name">Опциональные ингредиенты</div>
                        <div className="ingredient-wrapper">
                            {
                                optional_ingredients.map((el)=>(
                                    <div className="ingredient optional-ingredient">
                                        <input className="ingredient-select" type="checkbox" checked={el.flag}/>
                                        <div className="ingredient-name">{el.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="selected-pizza-ingredients-wrapper">
                        <div className="ingredients-type-name">Добавить пиццу</div>
                        <div  className="ingredient-wrapper">
                            {
                                additional_ingredients.map((el)=>(
                                    <div className="ingredient additional-ingredient">
                                        <input className="ingredient-select" type="checkbox" checked={el.flag}/>
                                        <div className="ingredient-name">{el.name}</div>
                                        <div className="ingredient-price">{el.price} грн.</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="selected-pizza-footer">
                <div className="selected-pizza-price">
                    Стоимость: {pizza.price} грн.
                </div>
                <button className="control-button default-button" onClick={handleAddPizzaToCart}>
                    Добавить в корзину
                </button>
            </div>
        </div>
    )
}


export default PizzaModal;
