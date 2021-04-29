import loup from "../assets/images/loupe.png";
import React, {useRef} from "react";
import "../assets/css/search_bar.css"


function SearchBar({onSearch}) {
    const to_search = useRef("");
    const onSearchCallback = () => onSearch(to_search.current.value)

    return (
        <div className="search">
            <input
                ref = {to_search}
                placeholder="Поиск"
                className="search-input"
                type="text"
            />
            <button className="search-button" onClick={onSearchCallback}>
                <img className="search-img" src={loup} alt="" />
            </button>
        </div>
    );
}


export default SearchBar;
