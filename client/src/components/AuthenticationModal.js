import React, {useRef} from "react";
import logo from "../assets/images/logo.png";
import "../assets/css/authentication_modal.css";
import {useDispatch} from "react-redux";
import {addToast} from "../actions";


function AuthenticationModal({onEnter})
{
    const dispatch = useDispatch()
    let username = useRef("");
    let password = useRef("");
    let admin = useRef(false);
    let operator = useRef(false)


    const handleEnter = () => {
        if ([username.current.value, password.current.value].some(el => el.length === 0)) {
            return dispatch(addToast("error","Заполните все поля!!!"))
        }
        if (!admin.current.checked && !operator.current.checked) {
            return dispatch(addToast("error","Выберите роль!!!"))
        }
        onEnter(username.current.value,
            password.current.value,
            operator.current.checked && !admin.current.checked ? "ROLE_OPERATOR":"ROLE_ADMIN")
    };

    return (
        <div className="authentication rounded-container double-shadowed">
            <div className="authentication-title">Авторизация</div>
            <div className="authentication-logo-wrapper">
                <img className="authentication-logo" src={logo} alt="Здесь лого" />
            </div>
            <div className="authentication-username-title">Имя пользователя: </div>
            <input className="authentication-username default-input-bar" ref={username} type="text" placeholder="имя" />
            <div className="authentication-password-title">Пароль: </div>
            <input className="authentication-password default-input-bar" ref={password} type="password" placeholder="пароль" />
            <div className="authentication-role-title">Роль: </div>
            <div className="authentication-role-wrapper rounded-container double-shadowed">

                <div className="role-item">
                    <input ref={admin} type="radio" id="ROLE_ADMIN" name="roles" value="Админ" />
                    <label htmlFor="ROLE_ADMIN">Админ</label>
                </div>
                <div className="role-item">
                    <input ref={operator} type="radio" id="ROLE_OPERATOR" name="roles" value="Оператор"/>
                    <label htmlFor="ROLE_OPERATOR">Оператор</label>
                </div>
            </div>
            <button className="authentication-submit default-button" onClick={handleEnter}>Войти</button>
        </div>
    )
}

export default AuthenticationModal