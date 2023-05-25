import React from 'react';
import defaultAvatar from '../images/profile-kusto.jpg';
import Card from './Card';
import api from '../utils/api';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const [userAvatar, setuserAvatar] = React.useState();
  const [userName, setuserName] = React.useState();
  const [userDescription, setuserDescription] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInformation()
      .then((data) => {
        setuserAvatar(data.avatar);
        setuserName(data.name);
        setuserDescription(data.about);
      })
      .catch(err => console.log(`Ошибка при загрузке первоначальной информации: ${err}`))
  }, [userAvatar, userName, userDescription])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(err => console.log(`Ошибка при загрузке первоначальных карточек: ${err}`))
  }, [])


  return (
    <main>
      <section className="profile" aria-label="Информация о профиле">
        <div className="profile__info">
          <button type="button" className="profile__avatar-button" aria-label="Изменить аватар" onClick={onEditAvatar}>
            <img src={userAvatar ? userAvatar : defaultAvatar} alt="Аватар пользователя." className="profile__image" />
          </button>
          <div className="profile__description">
            <div className="profile__text">
              <h1 className="profile__title">{userName ? userName : 'Жак-Ив Кусто'}</h1>
              <p className="profile__subtitle">{userDescription ? userDescription : 'Исследователь океана'}</p>
            </div>
            <button type="button" className="profile__edit-button button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          </div>
        </div>
        <button type="button" className="profile__add-button button" aria-label="Добавить карточку" onClick={onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Плитка картинок">
        <ul className="elements__list">
          {cards.map((card, id) => (
            <Card key={id}
            card={card}
            onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
