import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');



    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeLink(e) {
        setLink(e.target.value);
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        //console.log('[')
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
          name,
          link,
        });
        setName('');
        setLink('');
    }

    return (
        <PopupWithForm
        name="profile-add"
        title="Новое место"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <fieldset
          className="popup__fieldset popup__fieldset_profile-add"
          noValidate
        >

          <input
            id="place-name"
            type="text"
            name="PlaceName"
            className="popup__input popup__input_assignment_place-name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            noValidate
            value={name}
            onChange={handleChangeName}
          />
          <span
            id="place-name-error"
            className="popup__input-error popup__input-error_place-name"
          ></span>

          <input
            id="place-link"
            type="url"
            name="PlaceLink"
            className="popup__input popup__input_assignment_place-link"
            placeholder="Ссылка на картинку"
            required
            noValidate
            value={link}
            onChange={handleChangeLink}
          />
          <span
            id="place-link-error"
            className="popup__input-error popup__input-error_place-link"
          ></span>
        </fieldset>
        <button
          type="submit"
          className="popup__submit popup__create popup__submit_active"
          aria-label="create"
        >
          Создать
        </button>
      </PopupWithForm>
    )
}

export default AddPlacePopup;