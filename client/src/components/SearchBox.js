import React from 'react';
import SearchBar from "./SearchBar";
import "../assets/css/search_box.css"


function SearchBox({ onFilterView }) {
    const func = (search) => alert(search);
    return (
        <div className="search-box  shadowed">
            <SearchBar onSearch={func}/>
            <div className="button-filter-wrapper">
                <button className="button-filter default-button" onClick={onFilterView}>
                    Фильтр ингредиентов
                </button>
            </div>
        </div>
    );
}


export default SearchBox
