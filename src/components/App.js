import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeletionConfirmationPopup from './DeletionConfirmationPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardForDelete, setCardForDelete] = React.useState(null);

  const [preloader, setPreloader] = React.useState(false);


  React.useEffect(() => {
    api.getAllInitialInformation()
      .then((argument) => {
        const [initialCards, userInformation] = argument;

        setCards(initialCards);
        setCurrentUser(userInformation);
      })
      .catch(err => console.log(`Ошибка при загрузке первоначальной информации: ${err}`))
  }, [])


  function handleCardLike(currentCard) {
    const isLiked = currentCard.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(currentCard._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map(card => card._id === currentCard._id ? newCard : card));
      })
      .catch(err => console.log(`Ошибка при добавлении или удалении лайка: ${err}`))
  }

  function handleCardDelete(cardForDelete) {
    api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards((cards) => cards.filter(card => card._id !== cardForDelete._id));
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
      .finally(() => {
        setPreloader(false);
      })
  }

  function handleUpdateAvatar(newUserAvatar) {
    api.updateAvatar(newUserAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при обновлении аватара: ${err}`))
      .finally(() => {
        setPreloader(false);
      })
  }

  function handleUpdateUser(newUserInfo) {
    api.updateUserInformation(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при обновлении данных: ${err}`))
      .finally(() => {
        setPreloader(false);
      })
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при добавлении карточки: ${err}`))
      .finally(() => {
        setPreloader(false);
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeleteConfirmationPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmationPopupOpen(false);
    setSelectedCard(null);
    setCardForDelete(null);
  }

  function closeByMouse(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    };
  }

  function changePreloaderStatus() {
    setPreloader(true);
  }


  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={setSelectedCard}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
          cardForConfirmation={setCardForDelete}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onKeyDown={closeAllPopups}
          onMouseDown={closeByMouse}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={preloader}
          changePreloaderStatus={changePreloaderStatus}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onKeyDown={closeAllPopups}
          onMouseDown={closeByMouse}
          onUpdateUser={handleUpdateUser}
          isLoading={preloader}
          changePreloaderStatus={changePreloaderStatus}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onKeyDown={closeAllPopups}
          onMouseDown={closeByMouse}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={preloader}
          changePreloaderStatus={changePreloaderStatus}
        />
        < DeletionConfirmationPopup
          isOpen={isDeleteConfirmationPopupOpen}
          onClose={closeAllPopups}
          onKeyDown={closeAllPopups}
          onMouseDown={closeByMouse}
          card={cardForDelete}
          onCardDelete={handleCardDelete}
          isLoading={preloader}
          changePreloaderStatus={changePreloaderStatus}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onMouseDown={closeByMouse}
          onKeyDown={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
