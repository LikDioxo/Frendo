import React from 'react';
import SearchBar from "./SearchBar";
import Nothing from "./Nothing";
import Loading from "./Loading";
import {useDispatch, useSelector} from "react-redux";
import {getFoundPizzerias} from "../actions";
import {isLoading} from "../selectors";
import "../assets/css/pizzeria_choice_modal.css";


function PizzeriaChoiceModal({onPizzeriaChosen, addresses})
{
    const dispatch = useDispatch();

    const searchPizzerias = (search) => {
        dispatch(getFoundPizzerias(search))
    };

    let loading = useSelector(isLoading);

    if (loading) {
        return <Loading/>
    }

    let pizzerias_boxes = addresses.map((data) =>
        <div className="pizzeria-info double-shadowed" key={data.id}  onClick={() => onPizzeriaChosen(data)}>
            <p className="pizzeria-address">{data.address}</p>
            <p className="pizzeria-queue">Заказов в очереди: {data.workload}</p>
        </div>
    );

    return (
        <div className="pizzeria-choice-box">
            <h1>Выберите пиццерию</h1>
            <SearchBar onSearch={searchPizzerias}/>
            <div className="pizzerias-info-box">
                {pizzerias_boxes.length !== 0 ?
                    pizzerias_boxes
                    : <Nothing text="По вашему запросу не найдено ни одну пиццерию."/>
                }
            </div>
        </div>
    )
}


export default PizzeriaChoiceModal
