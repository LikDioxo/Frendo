import React from 'react';




function PizzeriaChoiceModal({addresses})
{
    return (
        <div className="pizzeria-choice-box">
            <h1>Выберите пиццерию</h1>
            <h2>TODO: Зделать компонент SearchBar</h2>
            <div className="pizzerias-addresses">
                {addresses.map((address,  orders_quantity) =>
                <div className="pizzeria-address">
                    <p>{address}</p>
                    <p>Заказов в очереди:</p>
                    <p>{orders_quantity}</p>
                </div>
            )}

            </div>
        </div>
    )
}

export default PizzeriaChoiceModal