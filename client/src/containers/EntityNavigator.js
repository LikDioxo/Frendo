import React from 'react';


function EntityNavigator()
{

    return(
        <div className="rounded-container double-shadowed entity-navigator">
            <div className="entity-navigator-title">
                Таблицы
            </div>
            <div className="entity-navigator-buttons-wrapper">
                <button className="default-button operator-button entity-navigator-button">Ингредиенты</button>
                <button className="default-button operator-button entity-navigator-button">Пицци</button>
                <button className="default-button operator-button entity-navigator-button">Пиццерии</button>
                <button className="default-button operator-button entity-navigator-button">Пользователи</button>
            </div>
        </div>
    )



}


export default EntityNavigator