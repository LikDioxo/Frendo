import React from 'react';


function PizzeriaChoiceModal({addresses})
{
    return (
        <div className="pizzeria-choice-box">
            <h1>Выберите пиццерию</h1>
            <h2>TODO: Зделать компонент SearchBar</h2>
            <div className="pizzerias-addresses">
                {addresses.map((data) =>
                <div className="pizzeria-address">
                    <p>{data[0]}</p>
                    <p>Заказов в очереди:</p>
                    <p>{data[1]}</p>
                </div>
            )}

            </div>
        </div>
    )
}


export default PizzeriaChoiceModal
