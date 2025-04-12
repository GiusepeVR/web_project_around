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
      about: this._userJobLabel.textContent,
      avatar: this._userProfilePicture.src,
      _id: this._userId,
    };
    return userData;
  }

  setUserInfo(name, about, avatar) {
    this._userNameLabel.textContent = name;
    this._userJobLabel.textContent = about;
    this._userProfilePicture.src = avatar;
  }
}
