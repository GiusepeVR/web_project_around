export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameLabel = document.querySelector(userNameSelector);
    this._userJobLabel = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._userNameLabel.textContent,
      job: this._userJobLabel.textContent,
    };
    return userData;
  }

  setUserInfo(name, job) {
    this._userNameLabel.textContent = name;
    this._userJobLabel.textContent = job;
  }
}
