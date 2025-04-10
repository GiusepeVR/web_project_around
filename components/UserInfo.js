export default class UserInfo {
  constructor({
    userNameSelector,
    userJobSelector,
    userProfilePictureSelector,
    userId,
  }) {
    this._userNameLabel = document.querySelector(userNameSelector);
    this._userJobLabel = document.querySelector(userJobSelector);
    this._userProfilePicture = document.querySelector(
      userProfilePictureSelector
    );
    this._userId = userId;
  }

  getUserInfo() {
    const userData = {
      name: this._userNameLabel.textContent,
      job: this._userJobLabel.textContent,
      imageLink: this._userProfilePicture.src,
      _id: this._userId,
    };
    return userData;
  }

  setUserInfo(name, job) {
    this._userNameLabel.textContent = name;
    this._userJobLabel.textContent = job;
  }
}
