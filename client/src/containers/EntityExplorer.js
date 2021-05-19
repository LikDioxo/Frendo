import React from 'react';

import {getEntityType} from "../selectors";
import {useSelector} from "react-redux";
import SearchBar from "../components/SearchBar";
import Table from "./Table";
import IngredientsForm from "../components/IngredientsForm";
import PizzasForm from "../components/PizzasForm";
import PizzeriasForm from "../components/PizzeriasForm";
import UsersForm from "../components/UsersForm";


function EntityExplorer()
{

    let entity_type = useSelector(getEntityType)

    let types = {
        "ingredients": {
            name: "Ингредиенты",
            header: ["id", "Название", "Название картинки"],
            form: IngredientsForm
        },
        "pizzas": {
            name: "Пицци",
            header: ["id", "Название", "Название картинки"],
            form: PizzasForm
        },
        "pizzerias": {
            name:"Пиццерии",
            header: ["id", "Название", "Название картинки"],
            form: PizzeriasForm
        },
        "users": {
            name: "Пользователи",
            header: ["id", "Название", "Название картинки"],
            form: UsersForm
        }
    }
    if(entity_type === undefined)
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
            <Table header={current_type.header} entities={[]}/>
        </div>
    )
}


export default EntityExplorer
