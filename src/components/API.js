export default class API {
  constructor(options) {
    this._baseURL = options.url;
    this._token = options.token;
  }

  _handleResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Error ${response.status}: ${response.statusText}.`);
  }

  getUserData() {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }

  setUserData({ name, info }) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: info
      })
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }

  setUserAvatar(url) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(response => {
      return this._handleResponse(response);
    })
  }

  getCards() {
    return fetch(`${this._baseURL}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }

  addCard(card) {
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }

  deleteCard(cardID) {
    return fetch(`${this._baseURL}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }

  toggleLike(cardID, isLiked) {
    return fetch(`${this._baseURL}/cards/likes/${cardID}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(response => {
      return this._handleResponse(response);
    });
  }
}
