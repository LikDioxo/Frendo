import React from 'react';
import SearchBar from "./SearchBar";
import "../assets/css/pizzeria_choice_modal.css"


function PizzeriaChoiceModal({onPizzeriaChosen, addresses})
{
    return (
        <div className="pizzeria-choice-box">
            <h1>Выберите пиццерию</h1>
            <SearchBar/>
            <div className="pizzerias-info-box">
                {addresses.map((data) =>
                <div className="pizzeria-info double-shadowed" key={data[0]}  onClick={() => onPizzeriaChosen(data)}>
                    <p className="pizzeria-address">{data[1]}</p>
                    <p className="pizzeria-queue">Заказов в очереди: {data[2]}</p>
                </div>
            )}

            </div>
        </div>
    )
}


export default PizzeriaChoiceModal
