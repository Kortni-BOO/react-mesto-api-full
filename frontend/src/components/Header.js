import React from 'react';
import { Route, Switch, Link } from "react-router-dom";

function Header(props) {

    return (
        <header className="header">
            <div className="header__logo"></div>
            <Switch>
                <Route path="/signup">
                    <Link className="header__link" to="/signin">Войти</Link>
                </Route>
                <Route path="/signin">
                    <Link className="header__link" to="/signup">Регистрация</Link>
                </Route>
                <Route exact path="/">
                    <button onClick={props.onHeaderOpen} className={`${props.isPopupOpen ? 'header__button' : 'header__button_close'} `}></button>
                    <div className="header__content">
                        <p className="header__text">{props.onEmail}</p>
                        <Link className="header__link" to="/signin" onClick={props.onSignOut}>Выйти</Link>
                    </div>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;