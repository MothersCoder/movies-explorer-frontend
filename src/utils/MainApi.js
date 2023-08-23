const { NODE_ENV, REACT_APP_BASE_URL } = process.env;

export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  async _checkResponse (res) {
    let result = await res.json();
    return res.ok ? result : Promise.reject(`Ошибка ${res.status} ${result.message}`)
  }

  register (name, email, password) {
    return fetch (`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({name, email, password}),
    })
    .then(this._checkResponse)
  }

  login (email, password) {
    return fetch (`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({email, password}),
    })
    .then(this._checkResponse)
  }

  logout () {
    return fetch (`${this._baseUrl}/signout`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._checkResponse);
  }

  getUserData () {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._checkResponse)
  }

  changeUserData (name, email) {
    return fetch (`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({name, email})
    })
    .then(this._checkResponse)
  }

  likeFilm (data) {
    const { country, director, duration, year, description, trailerLink, owner, nameRU, nameEN } = data;
    const image  = `https://api.nomoreparties.co${data.image.url}`;
    const thumbnail = `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`;
    const movieId = data.id;
    return fetch (`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({country, director, duration, year, description, trailerLink, thumbnail, owner, movieId, nameRU, nameEN, image})
    })
    .then(this._checkResponse)
  }

  getLikedFilms () {
    return fetch (`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._checkResponse)
  }

  deleteLikedFilm (id) {
    return fetch (`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkResponse)
  }

}

export const api = new Api ({
  baseUrl: NODE_ENV === 'production' ? REACT_APP_BASE_URL : 'http://localhost:4000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
