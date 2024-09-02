export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResonse(res){
    if (res.ok){
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResonse);
  }

  // other methods for working with the API
  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`,{
      headers: this._headers
    })
    .then(this._checkResonse);
  }

  updatUserInfo(data){
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        job: data.job,
        avatar: data.avatar
      })
    })
    .then(this._checkResonse);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResonse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkResonse);
  }

  }

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authourization: "Bearer  91b601cc-d5b2-405d-a21a-614e7e8f57e7",
    "Content-Type": "application/json"
  }
});