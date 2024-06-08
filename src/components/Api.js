export default class Api {
    constructor(options) {
      // constructor body
      this._baseURL = options.baseURL;
      this._headers = options.headers;
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

    updateUserInfo(){
        fetch(`${this._baseURL}/user/me`,{
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                description: description,
            }),
        })
        .then((res) => this._checkResponse(res));
    }

    updateAvatar(){
        return fetch(`${this._baseURL}/user/me/avatar`,{
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
              }),
        })
        .then((res) => this._checkResponse(res));
    }

    createCards(){
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

    deleteCards(){
        return fetch (`${this._baseURL}/cards/:cardId`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
    }

    likeCards(){
        return fetch (`${this._baseURL}/cards/:cardId/likes`, {
            method: "PUT",
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
    }

    dislikeCards(){
        return fetch (`${this._baseURL}/cards/:cardId/likes`,{
            method: "DELETE",
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res));
    }

  }
