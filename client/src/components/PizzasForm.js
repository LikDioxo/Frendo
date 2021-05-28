import React from "react";

function PizzasForm() {
  //брала код для кнопки на
  //https://codepen.io/hartzis/pen/VvNGZP

  const [pizzaName, setPizzaName] = React.useState("");
  const [pizzaWeight, setPizzaWeight] = React.useState("");
  const [pizzaSize, setPizzaSize] = React.useState("");
  const [pizzaPrice, setPizzaPrice] = React.useState("");
  const [pizzaIngredients, setPizzaIngredients] = React.useState("");
  const [file, setFile] = React.useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState("");
  const _handleImageChange = (e) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      setFile(e.target.files[0]);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="form">
      <div>
        <h3>Название:</h3>
        <input
          value={pizzaName}
          onChange={(event) => setPizzaName(event.target.value)}
        />
      </div>
      <div>
        <h3>Название картинки:</h3>
        <input
          className="fileInput"
          type="file"
          onChange={(e) => _handleImageChange(e)}
        />
      </div>
      <div>
        <h3>Вес:</h3>
        <input
          value={pizzaWeight}
          onChange={(event) => setPizzaWeight(event.target.value)}
        />
      </div>
      <div>
        <h3>Размер:</h3>
        <input
          value={pizzaSize}
          onChange={(event) => setPizzaSize(event.target.value)}
        />
      </div>
      <div>
        <h3>Цена:</h3>
        <input
          value={pizzaPrice}
          onChange={(event) => setPizzaPrice(event.target.value)}
        />
      </div>
      <div>
        <h3>Ингредиенты:</h3>
        <input
          value={pizzaIngredients}
          onChange={(event) => setPizzaIngredients(event.target.value)}
        />
      </div>
    </div>
  );
}

export default PizzasForm;
