import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupWithImageSelector) {
    super(popupWithImageSelector);
    this._popupImage = this._popupElement.querySelector(".image-popup__img");
    this._popupLabel = this._popupElement.querySelector(".image-popup__label");
    this._popupCloseButton = this._popupElement.querySelector(
      ".image-popup__close-button"
    );
  }

  open(imagelink, labelText) {
    this._popupElement.classList.add("image-popup_opened");
    this._popupImage.src = imagelink;
    this._popupLabel.textContent = labelText;
  }

  close() {
    this._popupElement.classList.remove("image-popup_opened");
  }
}
