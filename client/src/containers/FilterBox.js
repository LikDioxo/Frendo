import React from 'react';
import {
    flipIngredientSelection,
    resetIngredientSelection,
    getFilteredPizzas,
    getAvailablePizzas
} from "../actions";
import {useDispatch} from "react-redux";
import "../assets/css/filter_box.css";


function FilterBox({pizzeria_id, ingredients}) {
    const dispatch = useDispatch()

    const show_ingredients = []
    const fetch_ingredients = []
    for (const ingredient in ingredients) {
        show_ingredients.push({
            id: ingredient,
            name: ingredients[ingredient].name,
            flag: ingredients[ingredient].flag
        })
        if(ingredients[ingredient].flag)
        {
            fetch_ingredients.push(ingredient)
        }

    }
    const handleReset = () =>
    {
        dispatch(resetIngredientSelection());
        dispatch(getAvailablePizzas(pizzeria_id));
    }

    const handleFilter = () => {
        if(fetch_ingredients.length !== 0)
        {
            dispatch(getFilteredPizzas(pizzeria_id, fetch_ingredients))
        }
        else
        {
            handleReset();
        }
    }

    return (
        <div className="filter-box double-shadowed">
            <h3>Фильтр ингредиентов</h3>
            <div className="ingredients-wrapper">
                {show_ingredients.map(({id,name, flag})=>(
                    <div className="filter-ingredient-wrapper">
                        <div className="filter-box-ingredient-name">{name}</div>
                        <input type="checkbox" onClick={(()=>dispatch(flipIngredientSelection(id)))} checked={flag}/>
                    </div>
                ))}
            </div>
            <div className="buttons-wrapper">
                <button  className="filter-box-clear default-button" onClick={handleReset}>Сбросить</button>
                <button className="filter-box-apply default-button" onClick={handleFilter}>Применить</button>
            </div>
        </div>
    );
}


export default FilterBox;
