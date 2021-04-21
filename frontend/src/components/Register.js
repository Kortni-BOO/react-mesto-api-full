import React from 'react';
import {Link, useHistory} from "react-router-dom";



function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        //console.log('[')
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onRegister(email, password);
    }

    return (
        <div className="register">
            <p className="register__title">Регистрация</p>
            <form
                className="register__form"
                onSubmit={handleSubmit}>
                <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    className="register__form_input"
                    placeholder="Email"
                    value={email}
                    onChange={handleChangeEmail}>
                </input>
                <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    className="register__form_input"
                    placeholder="Пароль"
                    value={password}
                    onChange={handleChangePassword}>
                    
                </input>
                <button
                    type="submit"
                    className="register__form_button-submit">
                        Зарегистрироваться
                </button>
            </form>
            <div className="register__signup">
                <p className="register__signup_text">Уже зарегистрированы? 
                <Link to='/signin' className="signup__link"> Войти</Link></p>
            </div>
        </div>
    )
}

export default Register;