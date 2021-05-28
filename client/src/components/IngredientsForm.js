import React from "react";

function IngredientsForm() {
  const [ingredientName, setIngredientName] = React.useState("");
  const [ingredientPrice, setIngredientPrice] = React.useState(0);
  return (
    <div className="form">
      <div>
        <h3>Название:</h3>
        <input
          value={ingredientName}
          onChange={(event) => setIngredientName(event.target.value)}
        />
      </div>
      <div>
        <h3>Цена:</h3>
        <input
          value={ingredientPrice}
          onChange={(event) => setIngredientPrice(event.target.value)}
        />
      </div>
    </div>
  );
}

export default IngredientsForm;
