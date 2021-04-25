import React from "react";
import { Route, Redirect, Switch, useHistory, Link } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth.js";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import HeaderPopup from "./HeaderPopupOpen";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [currentUser, setCurrentUser] = React.useState({name:'',about:''});
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEmail, setEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltip] = React.useState(false);
  //const [isAuth, setIsAuth] = React.useState(false);
  const history = useHistory();



 function getInfo() {
    Promise.all([api.getUserInformation(),api.getInitialCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card)
      })
      .catch((err) => console.log(err));
  };


    /*Добавить нового пользователя */
  function handleRegister(email, password){
      return auth.register(email, password)
        .then(() => {
          setIsInfoTooltip(true);
          history.push('/signin');
        })
        .catch((err) => {
          setIsInfoTooltip(false);
          if(err === 400) {
            console.log("Некорректно заполнено одно из полей");
          }
        })
  }

    /* Вход */
  function handleLogin(email, password) {
    return auth.authorize(email, password)
      .then((res) => {
        console.log(res)
        //tokenCheck()
        //setLoggedIn(true);
        history.push('/');
        getInfo();
      })
      .catch((err) => {
        if(err === 400) {
          console.log("Не передано одно из полей");
        }
        if(err === 401) {
          console.log("Пользователь с email не найден");
        }
      })
  }


  /* Выход  */
  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }
  //console.log(currentUser);
  function handleUpdateUser(user) {
      api.editUserInformation(user)
        .then((user) => {
          //console.log(user)
          setCurrentUser(user)
        })
        .catch((err) => console.log(`Ошибка при изменении данных ${err}`))
        .finally(() => closeAllPopups());
  }
  function handleUpdateAvatar(avatar) {
    api.editAvatarUser(avatar)
      .then((avatar) => setCurrentUser(avatar))
      .catch((err) => console.log(`Ошибка при обновлении аватара${err}`))
      .finally(() => closeAllPopups());
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => console.log(`Ошибка при постановки лайка ${err}`))
  }
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(`Ошибка при снятии лайка${err}`))
  }
  function handleAddCard(card) {
    api.addCard(card)
      .then((card) => setCards([card, ...cards]))
      .catch((err) => console.log(`Ошибка при добавлении карточки ${err}`))
      .finally(() => closeAllPopups());
  }
  /* Открытие попапов */
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  const [isHeaderPopup, setIsHeaderPopup] = React.useState(false);
  function handleHeaderPopupOpen() {
    setIsHeaderPopup(true);
  }
  /* Закрытие попапов */
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltip(false);
    setIsHeaderPopup(false);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  return (
    <div className="page">
      <HeaderPopup isOpen={isHeaderPopup} isEmail={isEmail} onClose={closeAllPopups}/>
      <CurrentUserContext.Provider value={currentUser}>
        <Header onEmail={isEmail} onSignOut={onSignOut} onHeaderOpen={handleHeaderPopupOpen}/>
        <Switch>
          <ProtectedRoute
            exact path="/"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onDeleteClick={handleCardDelete}
            loggedIn={loggedIn}
          />
          <Route path="/signup">
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin}/>
          </Route>
        </Switch>

        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          /*isAuth={isAuth}*/
        />
        <ImagePopup
          link={selectedCard.link}
          name={selectedCard.name}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

/**
 *         <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onDeleteClick={handleCardDelete} 
        />

          /*Проверка токена 
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if(token) {
      auth.getContent(jwt).then(res => {
        if (res) {
          setEmail(res.data.email);
          //console.log(res.data.email)
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        if(err === 401) {
          console.log("Токен не передан или передан не в том формате");
        }
      })
    }
  }
 */