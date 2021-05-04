import React from 'react';
import SearchBar from "./SearchBar";
import "../assets/css/pizzeria_choice_modal.css"


function PizzeriaChoiceModal({addresses})
{
    return (
        <div className="pizzeria-choice-box">
            <h1>Выберите пиццерию</h1>
            <SearchBar/>
            <div className="pizzerias-info-box">
                {addresses.map((data) =>
                <div className="pizzeria-info double-shadowed">
                    <p className="pizzeria-address">{data[0]}</p>
                    <p className="pizzeria-queue">Заказов в очереди: {data[1]}</p>
                </div>
            )}

            </div>
        </div>
    )
}


export default PizzeriaChoiceModal
