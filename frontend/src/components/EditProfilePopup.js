import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value)
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        //console.log('[')
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
    }


    return (
        <PopupWithForm
        name="profile-edit"
        title="Редактировать профиль"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <fieldset
          className="popup__fieldset popup__fieldset_profile-edit"
          noValidate
        >

          <input
            id="profile-name"
            type="text"
            name="ProfileName"
            className="popup__input popup__input_assignment_author-name"
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleChangeName}
          />
          <span
            id="profile-name-error"
            className="popup__input-error popup__input-error_author-name"
          ></span>

          <input
            id="profile-job"
            type="text"
            name="ProfileJob"
            className="popup__input popup__input_assignment_author-job"
            required
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleChangeDescription}
          />
          <span
            id="profile-job-error"
            className="popup__input-error popup__input-error_author-job"
          ></span>
        </fieldset>
        <button
          type="submit"
          className="popup__submit popup__submit_profile-edit popup__submit_active"
          aria-label="save"
        >
          Сохранить
        </button>
      </PopupWithForm>
    )

}
export default EditProfilePopup;