import React from "react";
import access from "../images/Union.svg";
import error from "../images/UnionErrorSVG.svg";

function InfoTooltip(props) {
    return (
        <div className={`popup popup_auth ${props.isOpen ? "popup_is-opened" : ""}`}>
            <div className={`popup__container popup__container_auth`}>
                <button className={`popup__close popup__close_auth`} onClick={props.onClose}></button>
                <div className="popup__content_auth">
                    <img src={`${props.isAuth ? access : error} `} className="popup__image_auth" alt={`${props.isAuth ? "Доступ разрешен" : "Ошибка"} `} />
                    <p className="popup__info_auth">{`${props.isAuth ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;
//props.isAuth