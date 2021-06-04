import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {addEntity} from "../actions";


function IngredientsForm() {
    let dispatch = useDispatch()

    let ingredientName = useRef();
    let ingredientPrice = useRef();

    let addEntityHandler = () => {
        dispatch(addEntity(
            'ingredients',
            ingredientName.current && ingredientPrice.current ? {
                name: ingredientName.current.value,
                price: ingredientPrice.current.value
            } : undefined
            )
        )
    }

    return (
        <div className="entity-form entity-add-form">
            <div className="entity-form-fields-wrapper entity-add-form-fields-wrapper">
                <div className="entity-form-field-title entity-add-form-field-title">Название:</div>
                <input
                    ref={ingredientName}
                    className="default-input-bar entity-form-field-input entity-add-form-field-input"
                />
                <div className="entity-form-field-title entity-add-form-field-title">Цена:</div>
                <input
                    ref={ingredientPrice}
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


export default IngredientsForm;
