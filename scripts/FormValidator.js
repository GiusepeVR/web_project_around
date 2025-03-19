export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("popup__input_type_valid");
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__input-error_active");
    inputElement.classList.add("popup__input_type_valid");
    errorElement.textContent = "";
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (inputList, buttonElement) => {
    console.log(this._hasInvalidInput(inputList));
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add("popup__button_disabled");
    } else {
      buttonElement.classList.remove("popup__button_disabled");
    }
  };

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__button");
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    this._toggleButtonState(inputList, buttonElement);
  };

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form"));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });

      const fieldsetList = Array.from(
        formElement.querySelectorAll(".popup__fieldset")
      );

      fieldsetList.forEach((fieldset) => {
        this._setEventListeners(fieldset);
      });
    });
  };
}
