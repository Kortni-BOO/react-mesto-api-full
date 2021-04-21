import React from "react";

function ImagePopup(props) {
  //console.log(props.card)
  return (
    <div
      className={`popup popup_profile-image ${
        props.isOpen && "popup_is-opened"
      }`}
    >
      <div className="popup__container popup__container-image">
        <button
          type="button"
          className="popup__close popup__close_image"
          aria-label="close"
          onClick={props.onClose}
        ></button>
        <img className="popup__image" src={props.link} alt="картинка" />
        <h6 className="popup__name">{props.name}</h6>
      </div>
    </div>
  );
}

export default ImagePopup;
//style={{ backgroundImage: `url(${props.link})` }}
