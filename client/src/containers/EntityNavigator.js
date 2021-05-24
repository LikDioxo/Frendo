import React from 'react';
import {useDispatch} from "react-redux";
import {getEntities, setEntityType} from "../actions";


function EntityNavigator()
{
    const dispatch = useDispatch()


    return(
        <div className="entity-navigator">
            <div className="entity-navigator-title">
                Таблицы
            </div>
            <div className="entity-navigator-buttons-wrapper">
                <button
                    onClick={() => {
                        dispatch(setEntityType("ingredients"))
                        dispatch(getEntities("ingredients"))
                    }}
                    className="default-button operator-button entity-navigator-button">Ингредиенты</button>
                <button
                    onClick={()=>{
                        dispatch(setEntityType("pizzas"))
                        dispatch(getEntities("pizzas"))
                    }}
                    className="default-button operator-button entity-navigator-button">Пицци</button>
                <button
                    onClick={()=>{
                        dispatch(setEntityType("pizzerias"))
                        dispatch(getEntities("pizzerias"))
                    }}
                    className="default-button operator-button entity-navigator-button">Пиццерии</button>
                <button
                    onClick={()=>{
                        dispatch(setEntityType("users"))
                        dispatch(getEntities("users"))
                    }}
                    className="default-button operator-button entity-navigator-button">Пользователи</button>
            </div>
        </div>
    )
}


export default EntityNavigator
