import React from "react";
import { Link } from "react-router-dom";

function HeaderPopup(props) {
    return (
        <div
        className={`info__user ${
          props.isOpen && "info__user_vid"
        }`}
      >
        <p className="header__text">{props.isEmail}</p>
        <Link className="header__link" to="/signin">Выйти</Link>
        <button className="header__close" onClick={props.onClose}></button>
      </div>
    )
}
export default HeaderPopup;