import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }

    return (
        <PopupWithForm
        name="profile-avatar-edit"
        title="Обновить аватар"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >

        <input
          id="avatar-profile"
          type="url"
          name="AvatarProfile"
          className="popup__input popup__input_assigment_avatar-edit"
          placeholder="Ссылка на аватар"
          required
          noValidate
          ref={avatarRef}
        />
        <span
          id="avatar-profile-error"
          className="popup__input-error popup__input-error-avatar-edit"
        ></span>
        <button
          type="submit"
          className="popup__submit popup__submit_active popup__avatar-save"
        >
          Сохранить
        </button>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;