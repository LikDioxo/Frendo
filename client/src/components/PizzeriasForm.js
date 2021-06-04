import React, {useRef} from "react";
import {addEntity} from "../actions";
import {useDispatch} from "react-redux";


function PizzeriasForm() {
    let dispatch = useDispatch();

    let pizzeriaAddress = useRef();
    let pizzeriaOperatorID = useRef();

    let addEntityHandler = () => {
        dispatch(addEntity(
            'pizzerias',
            pizzeriaAddress.current && pizzeriaOperatorID.current ? {
                address: pizzeriaAddress.current.value,
                operator_id: pizzeriaOperatorID.current.value
            } : undefined
            )
        )
    }

    return (
        <div className="entity-form entity-add-form">
            <div className="entity-form-fields-wrapper entity-add-form-fields-wrapper">
                <div className="entity-form-field-title entity-add-form-field-title">Адресс:</div>
                <input
                    ref={pizzeriaAddress}
                    className="default-input-bar entity-form-field-input entity-add-form-field-input"
                />
                <div className="entity-form-field-title entity-add-form-field-title">ID оператора:</div>
                <input
                    ref={pizzeriaOperatorID}
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


export default PizzeriasForm;
