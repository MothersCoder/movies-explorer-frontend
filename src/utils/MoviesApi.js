export default class MoviesApi {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  async _checkResponse (res) {
    let result = await res.json();
    return res.ok ? result : Promise.reject(`Ошибка ${res.status} ${result.message}`)
  }

  getMovies () {
    return fetch (`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
}

export const movie = new MoviesApi ({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

