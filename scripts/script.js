import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  localSettings,
  addPlaceButton,
  editProfileButton,
} from "../utils/constants.js";

const imageOverlay = new PopupWithImage(".image-popup");
imageOverlay.setEventListeners();

const imageCardList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = new Card(
        element.name,
        element.link,
        "#card-template",
        () => {
          imageOverlay.open(card._imageLink, card._text);
        }
      );
      const cardElement = card.createCard(card._getTemplate());
      imageCardList.addItem(cardElement);
    },
  },
  ".photo-grid"
);
imageCardList.setItems();

const profileValidator = new FormValidator(localSettings, "#user-popup");
profileValidator.enableValidation();

const placeValidator = new FormValidator(localSettings, "#place-popup");
placeValidator.enableValidation();

const profileForm = new PopupWithForm("#user-popup", (data) => {
  const info = new UserInfo({
    userNameSelector: ".profile__name",
    userJobSelector: ".profile__description",
  });
  info.getUserInfo();
  info.setUserInfo(data.name, data.about);
});
profileForm.setEventListeners();

const placeForm = new PopupWithForm("#place-popup", (data) => {
  const card = new Card(data.title, data.link, "#card-template", () => {
    imageOverlay.open(card._imageLink, card._text);
  });
  const cardElement = card.createCard(card._getTemplate());
  imageCardList.addItem(cardElement);
});
placeForm.setEventListeners();

editProfileButton.addEventListener("click", () => {
  profileForm.open();
});

addPlaceButton.addEventListener("click", () => {
  placeForm.open();
});
