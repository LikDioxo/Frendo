import React, {useRef} from "react";
import logo from "../assets/images/logo.png";
import "../assets/css/authentication_modal.css";


function AuthenticationModal({onEnter})
{

    let username = useRef("");
    let password = useRef("");
    let role = useRef();

    console.log(role);

    const handleEnter = () => {
        if ([username.current.value, password.current.value].some(el => el.length === 0)) {
            return alert('fill all the fields!')
        }
        if (role.current.checked === undefined) {
            return alert('choose the role!')
        }
        // onEnter(username.current.value, password.current.value, role.current.checked ? "ROLE_OPERATOR":"ROLE_ADMIN")
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
                    <input ref={role} type="radio" id="ROLE_ADMIN" name="roles" value="Админ" checked/>
                    <label htmlFor="ROLE_ADMIN">Админ</label>
                </div>
                <div className="role-item">
                    <input ref={role} type="radio" id="ROLE_OPERATOR" name="roles" value="Оператор"/>
                    <label htmlFor="ROLE_OPERATOR">Оператор</label>
                </div>
            </div>
            <button className="authentication-submit default-button" onClick={handleEnter}>Войти</button>
        </div>
    )
}

export default AuthenticationModal