import React from 'react';
import "../assets/css/admin.css"


function EntityNavigator()
{

    return(
        <div className="entity-navigator-wrapper">
            <div className="shadowed">
                Таблицы
            </div>
            <div className="entities-button-wrapper">
                <button className="entity-button operator-header-logout default-button operator-button">Ингредиенты</button>
                <button className="entity-button operator-header-logout default-button operator-button">Пицци</button>
                <button className="entity-button operator-header-logout default-button operator-button">Пиццерии</button>
                <button className="entity-button operator-header-logout default-button operator-button">Пользователи</button>
            </div>
        </div>
    )



}


export default EntityNavigator