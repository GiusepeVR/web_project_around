export default class Card {
  constructor(
    cardText,
    cardImageLink,
    cardSelector,
    isLiked,
    handleCardClick,
    handleAsyncRemoval,
    handleAsyncCardLike
  ) {
    this._text = cardText;
    this._imageLink = cardImageLink;
    this._cardSelector = cardSelector;
    this._isLiked = isLiked;
    this._cardElement = this._getTemplate();
    this._deleteButton = this._cardElement.querySelector(
      ".photo-grid__card-button_delete"
    );
    this._likeButton = this._cardElement.querySelector(
      ".photo-grid__card-button_like"
    );
    this._cardImage = this._cardElement.querySelector(
      ".photo-grid__card-image"
    );
    this._cardTitle = this._cardElement.querySelector(
      ".photo-grid__card-title"
    );
    this._handleCardClick = handleCardClick;
    this._handleAsyncRemoval = handleAsyncRemoval;
    this._handleAsyncLike = handleAsyncCardLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".photo-grid__card")
      .cloneNode(true);

    return cardElement;
  }

  _handleOpenImagePopup() {
    const imagePopup = document.querySelector("#image-overlay");
    const imagePopupImageTag = document.querySelector(".image-popup__img");
    imagePopupImageTag.src = this._imageLink;
    const imagePopupImageLabel = document.querySelector(".image-popup__label");
    imagePopupImageLabel.textContent = this._cardTitle.textContent;
    imagePopup.classList.toggle("image-popup_opened");
  }

  _handleCardDelete() {
    this._handleAsyncRemoval();
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("photo-grid__card-button_like_active");
    this._handleAsyncLike();
  }

  _setLike() {
    if (this._isLiked) {
      this._likeButton.classList.add("photo-grid__card-button_like_active");
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete();
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
  }

  createCard() {
    this._setEventListeners();
    this._cardImage.src = this._imageLink;
    this._cardTitle.textContent = this._text;
    this._setLike();
    return this._cardElement;
  }

  removeCard() {
    this._cardElement.remove();
  }
}
