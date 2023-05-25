import React from 'react';

function Card({card, onCardClick}) {
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <div className="card-template">
      <li className="element">
        <button type="button" className="element__delete-button button" aria-label="Удалить"></button>
        <img className="element__image" alt={card.name} src={card.link} onClick={handleCardClick}/>
        <div className="element__items">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button type="button" className="element__like-button" aria-label="Понравилось"></button>
            <p className="element__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;
