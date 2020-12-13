export default class API {
  constructor(options) {
    this._baseURL = options.url;
    this._token = options.token;
  }

  _getErrorInfo(error) {
    return Promise.reject(`Error ${error.status}: ${error.statusText}.`);
  }

  getUserData(path) {
    return fetch(this._baseURL + path, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(response => {
      return response.ok
        ? response.json()
        : this._getErrorInfo(response);
    });
  }

  setUserData(path, { name, info }) {
    return fetch(this._baseURL + path, {
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
      return response.ok
        ? response.json()
        : this._getErrorInfo(response);
    });
  }

  setUserAvatar(path, url) {
    return fetch(this._baseURL + path, {
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
      return response.ok
        ? response.json()
        : this._getErrorInfo(response);
    })
  }

  getCards(path) {
    return fetch(this._baseURL + path, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(response => {
      return response.ok
        ? response.json()
        : this._getErrorInfo(response);
    });
  }
}
