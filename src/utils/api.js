class Api {
  constructor(baseUrl, authorization) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
  }

  // Метод для загрузки начальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
      }
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  // Метод для добавления новой карточки
  addNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  // Метод для загрузки информации о пользователе с сервера
  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
      }
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  getAllInitialInformation() {
    return Promise.all([this.getInitialCards(), this.getUserInformation()])
  }

  // Метод для обновления данных пользователя
  updateUserInformation(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  // Метод для удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }

  // Метод для добавления лайка
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: []
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  // Метод для удаления лайка
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  // Метод изменения аватара
  updateAvatar(item) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-65', '666ba4aa-bf4b-46da-a423-f025c96c005e');

export default api;
