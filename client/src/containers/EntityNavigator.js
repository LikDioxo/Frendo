import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {flipAddEntityFormView, getEntities, setEntityType} from "../actions";
import {getShowAddEntityFormView} from "../selectors";


function EntityNavigator()
{
    const dispatch = useDispatch();
    const is_show_add_entity_form = useSelector(getShowAddEntityFormView);
    const flipAddEntityView = is_show_add_entity_form ? () => dispatch(flipAddEntityFormView()) : () => {};

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
                        flipAddEntityView()
                    }}
                    className="default-button operator-button entity-navigator-button">Ингредиенты</button>
                <button
                    onClick={()=>{
                        dispatch(setEntityType("pizzas"))
                        dispatch(getEntities("pizzas"))
                        flipAddEntityView()
                    }}
                    className="default-button operator-button entity-navigator-button">Пиццы</button>
                <button
                    onClick={()=>{
                        dispatch(setEntityType("pizzerias"))
                        dispatch(getEntities("pizzerias"))
                        flipAddEntityView()
                    }}
                    className="default-button operator-button entity-navigator-button">Пиццерии</button>
                <button
                    onClick={()=>{
                        dispatch(setEntityType("users"))
                        dispatch(getEntities("users"))
                        flipAddEntityView()
                    }}
                    className="default-button operator-button entity-navigator-button">Пользователи</button>
            </div>
        </div>
    )
}


export default EntityNavigator
