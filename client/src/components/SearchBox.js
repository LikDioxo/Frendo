import React from 'react';
import loup from "../assets/images/loup.jpg";


function SearchBox({onFilterView})
{

    return (<div className="search-box">
            <div className="search">
                <input type="text" size="40" className="search"/>
                <button className="search-button">
                    <img src={loup} alt=""/>
                </button>
            </div>
            <button className="button" onClick={onFilterView}>Фильтр ингредиентов</button>
        </div>
    )
}



export default SearchBox
