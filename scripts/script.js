import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const userPopUpElement = document.querySelector("#user-popup");
const placePopUpElement = document.querySelector("#place-popup");
const closeUserPopupButton = document.querySelector(
  "#user-popup__close-button"
);
const closePlacePopupButton = document.querySelector(
  "#place-popup__close-button"
);

const storedProfileName = document.querySelector(".profile__name");
const storedProfileAbout = document.querySelector(".profile__description");

const profileFormElement = document.querySelector("#profile-form");
const placeFormElement = document.querySelector("#place-form");

const cardsSection = document.querySelector(".photo-grid");
const mainSection = document.querySelector(".content");

const imagePopupTemplate = document.querySelector(
  "#popup-image-template"
).content;

const imagePopupClone = imagePopupTemplate.cloneNode(true);
mainSection.append(imagePopupClone);
const imagePopup = document.querySelector("#image-overlay");
const imagePopupImageCloseButton = document.querySelector(
  ".image-popup__close-button"
);

const popupNodeList = document.querySelectorAll(".image-popup, .popup");
const popupList = Array.from(popupNodeList);

imagePopupImageCloseButton.addEventListener("click", function () {
  toggleImagePopup();
});

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
].reverse();

function toggleUserPopup() {
  userPopUpElement.classList.toggle("popup_opened");
}

function togglePlacePopup() {
  placePopUpElement.classList.toggle("popup_opened");
}

function toggleImagePopup() {
  imagePopup.classList.toggle("image-popup_opened");
}

function genericPopupToggle() {
  switch (true) {
    case userPopUpElement.classList.contains("popup_opened"):
      userPopUpElement.classList.toggle("popup_opened");
      break;
    case placePopUpElement.classList.contains("popup_opened"):
      placePopUpElement.classList.toggle("popup_opened");
      break;
    case imagePopup.classList.contains("image-popup_opened"):
      imagePopup.classList.toggle("image-popup_opened");
      break;
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  storedProfileName.textContent = profileNameInput.value;
  storedProfileAbout.textContent = profileAboutInput.value;
  toggleUserPopup();
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const userInputImageLink = placeImageLinkInput.value;
  const userInputPlaceName = placeNameInput.value;
  prependCard(userInputPlaceName, userInputImageLink);
  togglePlacePopup();
}

editProfileButton.addEventListener("click", toggleUserPopup);
addPlaceButton.addEventListener("click", togglePlacePopup);
closeUserPopupButton.addEventListener("click", toggleUserPopup);
closePlacePopupButton.addEventListener("click", togglePlacePopup);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
placeFormElement.addEventListener("submit", handlePlaceFormSubmit);

document.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    genericPopupToggle();
  }
});

document.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    genericPopupToggle();
  }
});

popupList.forEach((popup) =>
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      genericPopupToggle();
    }
  })
);

function prependCard(title, imageLink) {
  const card = new Card(title, imageLink, "#card-template");
  cardsSection.prepend(card.createCard());
}

initialCards.forEach((element) => {
  prependCard(element.name, element.link);
});

const localSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileValidator = new FormValidator(localSettings, profileFormElement);
const cardValidator = new FormValidator(localSettings, placeFormElement);

profileValidator.enableValidation();
cardValidator.enableValidation();
