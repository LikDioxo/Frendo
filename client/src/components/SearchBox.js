import React from 'react';
import SearchBar from "./SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {getChosenPizzeria} from "../selectors";
import {getFoundPizzas} from "../actions";
import "../assets/css/search_box.css"


function SearchBox({ onFilterView }) {

    const dispatch = useDispatch();
    const selected_pizzeria = useSelector(getChosenPizzeria);

    const searchPizzas = (search) => {
        dispatch(getFoundPizzas(selected_pizzeria.pizzeria_id, search))
    };
    return (
        <div className="search-box  shadowed">
            <SearchBar onSearch={searchPizzas}/>
            <div className="button-filter-wrapper">
                <button className="button-filter default-button" onClick={onFilterView}>
                    Фильтр ингредиентов
                </button>
            </div>
        </div>
    );
}


export default SearchBox
