import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__button-trash ${isOwn ? 'element__button-trash_visible' : 'element__button-trash_hidden'}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__button-like ${isLiked ? 'element__button-like__active' : 'element__button-like_inactive'}`
  );
 
  function handleClick() {
    props.onCardClick(props);
  }
  function handleLike() {
    props.onCardLike(props);
  }
  function handleDeleteClick() {
    props.onDeleteClick(props);
  }

  return (
    <li className="element">
      <div className="element__card">
        <div
          className="element__image"
          style={{ backgroundImage: `url(${props.link})` }}
          onClick={handleClick}
          alt="картирнка"
        ></div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="trash"
        onClick={handleDeleteClick}
      ></button>
      <div className="element__content">
        <h2 className="element__text">{props.name}</h2>
      </div>
      <button
        type="button"
        className={cardLikeButtonClassName}
        aria-label="like"
        onClick={handleLike}
      ></button>
      <h3 className="element__count">{props.likes.length}</h3>
    </li>
  );
}
export default Card;