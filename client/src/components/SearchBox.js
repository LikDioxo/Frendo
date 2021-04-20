import React from 'react';
import loup from "../assets/images/loup.jpg";


function SearchBox({ onFilterView }) {
    return (
        <div className="search-box">
            <div className="search">
                <input
                    placeholder="  Поиск"
                    className="search-input"
                    type="text"
                    size="40"
                />
                <button className="search-button">
                    <img className="search-img" src={loup} alt="" />
                </button>
            </div>
            <button className="button-filter" onClick={onFilterView}>
                Фильтр ингредиентов
            </button>
        </div>
    );
}



export default SearchBox
