import React from 'react';
import {useSelector} from "react-redux";

import {getEntityType, getFetchedEntities} from "../selectors";
import SearchBar from "../components/SearchBar";
import Table from "./Table";
import IngredientsForm from "../components/IngredientsForm";
import PizzasForm from "../components/PizzasForm";
import PizzeriasForm from "../components/PizzeriasForm";
import UsersForm from "../components/UsersForm";


function EntityExplorer()
{
    let entity_type = useSelector(getEntityType)
    let fetched_entities = useSelector(getFetchedEntities)

    console.log(entity_type);

    let types = {
        "ingredients": {
            name: "Ингредиенты",
            header: ["id", "Название", "Цена"],
            form: IngredientsForm
        },
        "pizzas": {
            name: "Пицци",
            header: ["id", "Название", "Название картинки", "Вес", "Размер", "Цена", "Ингредиенты"],
            form: PizzasForm
        },
        "pizzerias": {
            name:"Пиццерии",
            header: ["id", "Название", "id оператора", "Заказов в очереди"],
            form: PizzeriasForm
        },
        "users": {
            name: "Пользователи",
            header: ["id", "Имя пользователя", "Роли", "Пароль"],
            form: UsersForm
        }
    }

    if(entity_type === undefined || fetched_entities === undefined)
    {
        return (
            <div className="entity-explorer">
                <div className="start-text">
                    Выберите таблицу которую нужно изменить или добавить новую запись!
                </div>
            </div>
        )
    }

    let current_type = types[entity_type]

    return(
        <div className="entity-explorer">
            <div className="entity-explorer-header">
                <div className="entity-explorer-table-title">{current_type.name}</div>
                <button className="entity-explorer-add-record default-button operator-button">Добавить запись</button>
            </div>
            <SearchBar/>
            <Table header={current_type.header} entities={fetched_entities}/>
        </div>
    )
}


export default EntityExplorer
