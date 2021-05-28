import React from "react";

function PizzeriasForm() {
  const [pizzeriaName, setPizzeriaName] = React.useState("");
  const [pizzeriaOperatorID, setPizzeriaOperatorID] = React.useState("");
  const [pizzeriaOrders, setPizzeriaOrders] = React.useState("");
  return (
    <div className="form">
      <div>
        <h3>Название:</h3>
        <input
          value={pizzeriaName}
          onChange={(event) => setPizzeriaName(event.target.value)}
        />
      </div>
      <div>
        <h3>id оператора:</h3>
        <input
          value={pizzeriaOperatorID}
          onChange={(event) => setPizzeriaOperatorID(event.target.value)}
        />
      </div>
      <div>
        <h3>Заказов в очереди:</h3>
        <input
          value={pizzeriaOrders}
          onChange={(event) => setPizzeriaOrders(event.target.value)}
        />
      </div>
    </div>
  );
}

export default PizzeriasForm;
