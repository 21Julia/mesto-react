import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function closeByMouse(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    };
  }

  React.useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEsc);

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    }
  })


  return (
    <div>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={setSelectedCard}
      />
      <Footer />
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonTitle="Сохранить"
        buttonClass="popup__save-button_margin_s"
        children={
          <>
            <label htmlFor="avatar-input" className="popup__input-field">
              <input id="avatar-input" type="url" className="popup__input popup__input_type_avatar" placeholder="Ссылка на аватар" name="avatar" required />
              <span className="avatar-input-error popup__input-error"></span>
            </label>
          </>
        }
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onMouseDown={closeByMouse}
      />
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        buttonTitle="Сохранить"
        children={
          <>
            <label htmlFor="name-input" className="popup__input-field">
              <input id="name-input" type="text" className="popup__input popup__input_type_name" placeholder="Имя" name="name" defaultValue="Жак-Ив Кусто" minLength="2" maxLength="40" required />
              <span className="name-input-error popup__input-error"></span>
            </label>
            <label htmlFor="description-input" className="popup__input-field">
              <input id="description-input" type="text" className="popup__input popup__input_type_description" placeholder="О себе" name="about" defaultValue="Исследователь океана" minLength="2" maxLength="200" required />
              <span className="description-input-error popup__input-error"></span>
            </label>
          </>
        }
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onMouseDown={closeByMouse}
      />
      <PopupWithForm
        name="add"
        title="Новое место"
        buttonTitle="Создать"
        children={
          <>
            <label htmlFor="title-input" className="popup__input-field">
              <input id="title-input" type="text" className="popup__input popup__input_type_title" placeholder="Название" name="name" minLength="2" maxLength="30" required />
              <span className="title-input-error popup__input-error"></span>
            </label>
            <label htmlFor="link-input" className="popup__input-field">
              <input id="link-input" type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" name="link" required />
              <span className="link-input-error popup__input-error"></span>
            </label>
          </>
        }
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onMouseDown={closeByMouse}
      />
      <PopupWithForm
        name="confirmation"
        title="Вы уверены?"
        titleClass="popup__title_margin_s"
        buttonTitle="Да"
        buttonClass="popup__save-button_margin_s"
        onClose={closeAllPopups}
        onMouseDown={closeByMouse}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onMouseDown={closeByMouse}
      />
    </div>
  );
}

export default App;
