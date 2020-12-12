export default class API {
  constructor(options) {
    this._baseURL = options.url;
    this._token = options.token;
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
        : Promise.reject(`Error ${response.status}: ${response.statusText}.`);
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
        : Promise.reject(`Error ${response.status}: ${response.statusText}.`);
    });
  }
}
