export default class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _fetchData(endpoint, method, body) {
    return fetch(`${this._url}${endpoint}`, {
      headers: this._headers,
      body: JSON.stringify(body),
      method,
    }).then((res) => res.json());
  }

  getUserData() {
    return this._fetchData("/users/me");
  }

  updateUserData(userInfo) {
    return this._fetchData("/users/me", "PATCH", userInfo);
  }

  // updateUserAvatar(userImage) {
  //   return this._fetchData("/users/me/avatar", "PATCH", userImage);
  // }

  getInitialCards() {
    return this._fetchData("/cards");
  }

  addCard(cardInfo) {
    return this._fetchData("/cards", "POST", cardInfo);
  }

  deleteCard(cardId) {
    return this._fetchData(`/cards/${cardId}`, "DELETE");
  }

  handleCardLike(cardId, isLiked) {
    if (isLiked) {
      return this._fetchData(`/cards/${cardId}/likes`, "DELETE");
    } else {
      return this._fetchData(`/cards/${cardId}/likes`, "PUT");
    }
  }
}
