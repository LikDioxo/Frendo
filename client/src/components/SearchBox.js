import React from 'react';
import loup from "../assets/images/loup.jpg";
import SearchBar from "./SearchBar";


function SearchBox({ onFilterView }) {
    const func = (search) => alert(search);
    return (
        <div className="search-box">
            <SearchBar onSearch={func}/>
            <button className="button-filter" onClick={onFilterView}>
                Фильтр ингредиентов
            </button>
        </div>
    );
}



export default SearchBox
