/*
import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
*/
const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState('');
  const [token, setToken] = React.useState('');
  const history = useHistory();

  const handleTooltip = () => {
    setIsInfoTooltipOpen(true);
  };

  const onRegister = (email, password) => {
    auth.register(email, password)
      .then(() => {
        handleTooltip();
        setTooltipStatus(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log('Некорректно заполнено одно из полей ');
        }
        handleTooltip();
        setTooltipStatus(false);
      });
  };

  const onLogin = (email, password) => {
    auth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch((err) => {
        if (err.status === 400) {
          return console.log('не передано одно из полей');
        } if (err.status === 401) {
          return console.log('пользователь с email не найден');
        }
        return console.log('error 500');
      });
  };

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setToken(jwt);
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            return console.log('Токен не передан или передан не в том формате');
          }
          return console.log('Переданный токен некорректен');
        });
    }
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  };

  React.useEffect(() => {
    if (loggedIn) {
      const jwt = localStorage.getItem('jwt');
      api.getInitialCards(jwt)
        .then((res) => { setCards(res); })
        .catch((err) => console.log(err));
      api.getUserInfo(jwt)
        .then((res) => { setCurrentUser(res); })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  const handleOverlayClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    closeAllPopups();
  };

  const handleCardLike = (card) => {
    // eslint-disable-next-line max-len
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .putLike(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);// Обновляем стейт
      })
      .catch((err) => console.log(err));
  };

  const handleCardDislike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .removeLike(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards); // Обновляем стейт
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (id) => {
    api
      .deleteCard(id, token)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .editAvatar(data, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (newCard) => {
    api
      .addCard(newCard, token)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
  };
  const handleDeleteClick = (cardId) => {
    setIsDeletePopupOpen(true);
    setCardToDelete(cardId);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header email={email} onSignOut={onSignOut} />
          <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardDelete={handleDeleteClick}
            onCardLike={handleCardLike}
            onCardDislike={handleCardDislike}
            cards={cards}
            component={Main}
          />
          <Route path="/sign-in">
            <Login
              name="login"
              title="Вход"
              submit="Войти"
              onLogin={onLogin}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              name="register"
              title="Регистрация"
              submit="Зарегистрироваться"
              onRegister={onRegister}
            />
          </Route>
          </Switch>
          <Route exact path="/"><Footer /></Route>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onOverlayClose={handleOverlayClose}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onOverlayClose={handleOverlayClose}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onOverlayClose={handleOverlayClose}
          />
          <ConfirmDeletePopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            cardId={cardToDelete}
            onSubmit={handleCardDelete}
            onOverlayClose={handleOverlayClose}
          />
          <ImagePopup
            name="photo-zoom"
            card={selectedCard}
            onClose={closeAllPopups}
            onOverlayClose={handleOverlayClose}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            tooltipStatus={tooltipStatus}
            message="Вы успешно зарегистрировались!"
            errMessage='Что-то пошло не так! Попробуйте ещё раз.'
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;