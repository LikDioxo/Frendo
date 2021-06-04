import React, {useRef} from "react";
import {addEntity} from "../actions";
import {useDispatch} from "react-redux";


function UsersForm() {
    let dispatch = useDispatch();

    let userName = useRef();
    let password = useRef();
    let userRoles = useRef();

    let addEntityHandler = () => {
        dispatch(addEntity(
            'users',
            userName.current && userRoles.current && password.current ? {
                username: userName.current.value,
                password: password.current.value,
                roles: JSON.parse(userRoles.current.value)
            } : undefined
            )
        )
    }

    return (
        <div className="entity-form entity-add-form">
            <div className="entity-form-fields-wrapper entity-add-form-fields-wrapper">
                <div className="entity-form-field-title entity-add-form-field-title">Имя пользователя:</div>
                <input
                    ref={userName}
                    className="default-input-bar entity-form-field-input entity-add-form-field-input"
                />
                <div className="entity-form-field-title entity-add-form-field-title">Пароль:</div>
                <input
                    ref={password}
                    className="default-input-bar entity-form-field-input entity-add-form-field-input"
                />
                <div className="entity-form-field-title entity-add-form-field-title">Роли:</div>
                <input
                    ref={userRoles}
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


export default UsersForm;
