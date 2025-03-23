export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add("popup__opened");
  }
  close() {}
  _handleEscClose() {}
  setEventListeners() {}
}
