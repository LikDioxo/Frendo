import React, {useRef} from "react";



function AuthenticationModal({onEnter})
{

    let username = useRef("");
    let password = useRef("");
    let role = useRef(true);



    const handleEnter = () => {
        if ([username.current.value, password.current.value].some(el => el.length === 0)) {
            return alert('fill all the fields!')
        }
        onEnter(username.current.value, password.current.value, role.current.checked ? "ROLE_OPERATOR":"ROLE_ADMIN")
    };

    return (
        <div>
            <h2>Авторизация</h2>
            <div>
                <div className="Logo">
                    <img alt="Здесь лого"/>
                </div>
                <div>
                    <div>Имя пользователя:<input ref={username} type="text" placeholder="имя" /></div>
                    <div>Пароль: <input ref={password} type="password" placeholder="пароль" /></div>
                    <div>Роль:
                        <div>
                            <input ref={role} type="radio" id="ROLE_ADMIN" name="roles" value="Админ" checked={true}/>
                            <label htmlFor="ROLE_ADMIN">Админ</label>
                            <input ref={role} type="radio" id="ROLE_OPERATOR" name="roles" value="Оператор" />
                            <label htmlFor="ROLE_OPERATOR">Оператор</label>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleEnter}>Войти</button>
        </div>
    )
}

export default AuthenticationModal