import PopupWithForm from "./PopupWithForm.js";

export default class PopupWarning extends PopupWithForm {
  constructor(popupWarningSelector, handleFormSubmit) {
    super(popupWarningSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._formElement = this._popupElement.querySelector(
      ".confirmation-popup__form"
    );

    this._submitButton = this._formElement.querySelector(
      ".confirmation-popup__button"
    );
  }

  _getInputValues() {
    const inputList =
      this._confirmation - popupElement.querySelectorAll(".popup__input");
    this.formValues = {};
    inputList.forEach((input) => {
      this.formValues[input.name] = input.value;
    });
    return this.formValues;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }

  reset() {
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
