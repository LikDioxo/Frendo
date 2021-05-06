import React, {useCallback, useEffect} from 'react';
import {
    getIngredients,
    flipIngredientSelection,
    resetIngredientSelection,
    getFilteredPizzas,
    getAvailablePizzas
} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {getIngredientsSelector} from "../selectors";
import Loading from "../components/Loading";




function FilterBox({pizzeria_id}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getIngredients())
    },[dispatch])

    const ingredients = useSelector(getIngredientsSelector)
    if(ingredients === undefined){
       return <Loading/>
    }

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
    const handleFilter = () => dispatch(getFilteredPizzas(pizzeria_id, fetch_ingredients))

    return (
        <div className="filter-box">
            <h3>Фильтр ингредиентов</h3>
            <div className="ingredients-wrapper">
                {show_ingredients.map(({id,name, flag})=>(
                    <div>
                        <div>{name}</div>
                        <input type="checkbox" onClick={(()=>dispatch(flipIngredientSelection(id)))} checked={flag}/>
                    </div>

                ))}
            </div>
            <div className="buttons-wrapper">
                <button onClick={() => {
                    dispatch(resetIngredientSelection());
                    dispatch(getAvailablePizzas(pizzeria_id));
                }}>Сбросить</button>
                <button onClick={handleFilter}>Применить</button>
            </div>
        </div>
    );
}

export default FilterBox;