import loup from "../assets/images/loup.jpg";
import React, {useRef} from "react";



function SearchBar({onSearch}) {
    const to_search = useRef("");
    const onSearchCallback = () => onSearch(to_search.current.value)

    return (
        <div className="search">
            <input
                ref = {to_search}
                placeholder="  Поиск"
                className="search-input"
                type="text"
                size="40"
            />
            <button className="search-button" onClick={onSearchCallback}>
                <img className="search-img" src={loup} alt="" />
            </button>
        </div>
    );
}


export default SearchBar;