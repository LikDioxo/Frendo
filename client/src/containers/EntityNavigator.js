import React from 'react';
import {useDispatch} from "react-redux";
import {setEntityType} from "../actions";


function EntityNavigator()
{
    const dispatch = useDispatch()


    return(
        <div className="double-shadowed entity-navigator">
            <div className="entity-navigator-title">
                Таблицы
            </div>
            <div className="entity-navigator-buttons-wrapper">
                <button onClick={()=>dispatch(setEntityType("ingredients"))} className="default-button operator-button entity-navigator-button">Ингредиенты</button>
                <button onClick={()=>dispatch(setEntityType("pizzas"))} className="default-button operator-button entity-navigator-button">Пицци</button>
                <button onClick={()=>dispatch(setEntityType("pizzerias"))} className="default-button operator-button entity-navigator-button">Пиццерии</button>
                <button onClick={()=>dispatch(setEntityType("users"))} className="default-button operator-button entity-navigator-button">Пользователи</button>
            </div>
        </div>
    )
}


export default EntityNavigator
