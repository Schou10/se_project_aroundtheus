export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res){
    if (res.ok){
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options){
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  // other methods for working with the API
  getUserInfo(){
    return this._request(`${this._baseUrl}/users/me`,{
      method :"GET",
      headers: this._headers
    });
  }

  updateUserInfo(data){
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }

  updateUserAvatar(data){
    return this._request(`${this._baseUrl}/users/me/avatar`,{
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
  }

  addNewCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  addLike(cardId){
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  removeLike(cardId){
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  }

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authourization: "Bearer  91b601cc-d5b2-405d-a21a-614e7e8f57e7",
    "Content-Type": "application/json"
  }
});