import React, {useRef} from "react";
import {addEntity} from "../actions";
import {useDispatch} from "react-redux";

import upload from "../assets/images/upload.png";


function PizzasForm() {
    let dispatch = useDispatch();

    let pizzaName = useRef();
    let pizzaImage = useRef();
    let pizzaWeight = useRef();
    let pizzaSize = useRef();
    let pizzaPrice = useRef();
    let pizzaIngredients = useRef();

    // let isFieldsFilled = pizzaName.current && pizzaImage.current && pizzaWeight.current && pizzaSize.current && pizzaPrice.current && pizzaIngredients.current;
    let isFieldsFilled = true;

    let addEntityHandler = () => {
        dispatch(addEntity(
            'pizzas',
            isFieldsFilled ? {
                image: pizzaImage.current.files[0],
                name: pizzaName.current.value,
                weight: parseInt(pizzaWeight.current.value),
                size: parseInt(pizzaSize.current.value),
                price: parseFloat(pizzaPrice.current.value).toFixed(2),
                ingredients: JSON.parse(pizzaIngredients.current.value),
            } : undefined
            )
        )
    }

    // return (
    //     <div className="form">
    //         <div>
    //             <div>Название:</div>
    //             <input
    //                 value={pizzaName}
    //                 onChange={(event) => setPizzaName(event.target.value)}
    //             />
    //         </div>
    //         <div>
    //             <div>Картинка:</div>
    //             <input
    //                 className="fileInput"
    //                 type="file"
    //                 onChange={(e) => handleImageChange(e)}
    //             />
    //         </div>
    //         <div>
    //             <div>Вес:</div>
    //             <input
    //             />
    //         </div>
    //         <div>
    //             <div>Размер:</div>
    //             <input
    //             />
    //         </div>
    //         <div>
    //             <div>Цена:</div>
    //             <input
    //             />
    //         </div>
    //         <div>
    //             <div>Ингредиенты:</div>
    //             <input
    //             />
    //         </div>
    //     </div>
    // );

    return (
        <div className="entity-form entity-add-form">
            <div className="entity-form-fields-wrapper entity-add-form-fields-wrapper">
                <div className="entity-form-field-title entity-add-form-field-title">Название:</div>
                <input
                    ref={pizzaName}
                    className="default-input-bar entity-form-field-input entity-add-form-field-input"
                />
                <div className="entity-form-field-title entity-add-form-field-title">Картинка:</div>
                <label htmlFor="file-input" className="file-input-label">
                    <img className="file-input-label-image" src={upload} alt="Загрузить..."/>
                    <div className="file-input-label-text">Выбрать картинку</div>
                </label>
                <input
                    type="file"
                    id="file-input"
                    ref={pizzaImage}
                    className="default-input-bar entity-form-field-input entity-form-field-file entity-add-form-field-input entity-add-form-field-file"
                />
                <div className="entity-form-field-title entity-add-form-field-title">Вес:</div>
                <input
                    ref={pizzaWeight}
                    className="default-input-bar entity-form-field-input entity-add-form-field-input"
                />
                <div className="entity-form-field-title entity-add-form-field-title">Размер:</div>
                <input
                    ref={pizzaSize}
                    className="default-input-bar entity-form-field-input entity-add-form-field-input"
                />
                <div className="entity-form-field-title entity-add-form-field-title">Цена:</div>
                <input
                    ref={pizzaPrice}
                    className="default-input-bar entity-form-field-input entity-add-form-field-input"
                />
                <div className="entity-form-field-title entity-add-form-field-title">Ингредиенты:</div>
                <input
                    ref={pizzaIngredients}
                    className="default-input-bar entity-form-field-input entity-add-form-field-input"
                />
            </div>
            <button
                className="default-button operator-button entity-form-submit entity-add-form-submit"
                onClick={addEntityHandler}
            >Добавить</button>
        </div>
    );
}


export default PizzasForm;
