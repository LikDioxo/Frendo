import React from 'react';
import SearchBar from "./SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {getChosenPizzeria} from "../selectors";
import {addToast, flipFilterView, getFoundPizzas} from "../actions";
import "../assets/css/search_box.css"
import {useLocation} from "react-router";


function SearchBox() {

    const dispatch = useDispatch();
    const selected_pizzeria = useSelector(getChosenPizzeria);
    const location = useLocation()

    const searchPizzas = (search) => {
        if(location.pathname === "/") {
            if (selected_pizzeria.pizzeria_id === undefined) {
                dispatch(addToast("error", "Сперва выберите пиццерию"))
            } else {
                dispatch(getFoundPizzas(selected_pizzeria.pizzeria_id, search))
            }
        }
    };
    const changeFilterView = () => {
        if(location.pathname === "/") {
            if (selected_pizzeria.pizzeria_id === undefined) {
                dispatch(addToast("error", "Сперва выберите пиццерию"))
            } else {
                dispatch(flipFilterView());
            }
        }
    }
    return (
        <div className="search-box  shadowed">
            <SearchBar onSearch={searchPizzas}/>
            <div className="button-filter-wrapper">
                <button className="button-filter default-button" onClick={changeFilterView}>
                    Фильтр ингредиентов
                </button>
            </div>
        </div>
    );
}


export default SearchBox
