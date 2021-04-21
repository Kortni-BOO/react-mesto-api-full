import React from "react";
import api from "../utils/api.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          <button
            onClick={props.onEditAvatar}
            type="button"
            className="profile__avatar-overlay"
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              type="button"
              className="profile__button-edit"
              aria-label="edit"
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__button-add"
          aria-label="add"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((item) => (
            <Card 
              key={item._id} {...item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onDeleteClick={props.onDeleteClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
