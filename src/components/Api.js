export default class Api {
  constructor(settings) {
    // constructor body
    this._baseURL = settings.baseURL;
    this._headers = settings.headers;
  }

  _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`,{
    method: "GET",
    headers: this._headers,
    })
    .then((res) => this._checkResponse(res));
  }

  getUserInfo(){
      return fetch(`${this._baseURL}/users/me`,{
          method: "GET",
          headers: this._headers,
      })
      .then((res)=> this._checkResponse(res));
  }

  updateUserInfo(body){
      fetch(`${this._baseURL}/user/me`,{
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
              name: "TaeJoo Kim",
              description: "Software Engineer",
          }),
      })
      .then((res) => this._checkResponse(res));
  }

  updateAvatar(avatar){
      return fetch(`${this._baseURL}/user/me/avatar`,{
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
              avatar: url,
            }),
      })
      .then((res) => this._checkResponse(res));
  }

  createCards(body){
      return fetch(`${this._baseURL}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
              name: name,
              link: link,
            }),
      })
      .then((res) => this._checkResponse(res));
  }

  deleteCards(cardId){
      return fetch (`${this._baseURL}/cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
      })
      .then((res) => this._checkResponse(res));
  }

  likeCards(cardId){
      return fetch (`${this._baseURL}/cards/${cardId}/likes`, {
          method: "PUT",
          headers: this._headers,
      })
      .then((res) => this._checkResponse(res));
  }

  dislikeCards(cardId){
      return fetch (`${this._baseURL}/cards/${cardId}/likes`,{
          method: "DELETE",
          headers: this._headers,
      })
      .then((res) => this._checkResponse(res));
  }

}
