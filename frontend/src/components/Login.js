import React from 'react';


function Login(props) {
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
        
        console.log("WHAT")
        props.onLogin(email, password);
    }
    return (
        <div className="login">
            <p className="login__title">Вход</p>
            <form className="login__form" onSubmit={handleSubmit}>
                <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    className="login__form_input"
                    placeholder="Email"
                    value={email}
                    onChange={handleChangeEmail}/>
                <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    className="login__form_input"
                    placeholder="Пароль"
                    value={password}
                    onChange={handleChangePassword}/>
                <button
                    type="submit"
                    className="login__form_button-submit">
                        Войти
                </button>
            </form>
        </div>
    )
}

export default Login;
