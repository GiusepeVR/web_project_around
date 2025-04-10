import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  localSettings,
  addPlaceButton,
  editProfileButton,
} from "../utils/constants.js";

const api = new Api("https://around-api.es.tripleten-services.com/v1", {
  authorization: "e4cbebb7-eb58-4a49-8e2e-9574a704497b",
  "Content-Type": "application/json",
});
const cardDeleteWarning = new PopupWithForm("#delete-popup", (data) => {});

cardDeleteWarning.setEventListeners();
cardDeleteWarning.open();

const cardSection = new Section(
  {
    items: [],
    renderer: (element) => {
      console.log(element);
      const card = new Card(
        element.name,
        element.link,
        "#card-template",
        element.isLiked,
        () => {
          imageOverlay.open(card._imageLink, card._text);
        },
        () => {
          () => cardDeleteWarning.open(),
            api.deleteCard(element._id).then((res) => console.log(res));
        },
        () =>
          api
            .handleCardLike(element._id, element.isLiked)
            .then((res) => console.log(res))
      );
      const cardElement = card.createCard(card._getTemplate());
      cardSection.addItem(cardElement);
    },
  },
  ".photo-grid"
);

api.getInitialCards().then((data) => {
  cardSection.items = data.reverse();
  cardSection.setItems();
});

const imageOverlay = new PopupWithImage(".image-popup");
imageOverlay.setEventListeners();

const profileValidator = new FormValidator(localSettings, "#user-popup");
profileValidator.enableValidation();

const placeValidator = new FormValidator(localSettings, "#place-popup");
placeValidator.enableValidation();

const info = new UserInfo({
  userNameSelector: ".profile__name",
  userJobSelector: ".profile__description",
  profilePictureSelector: ".profile__avatar",
});

api.getUserData().then((data) => info.setUserInfo(data.name, data.about));

const profileForm = new PopupWithForm("#user-popup", (data) => {
  info.setUserInfo(data.name, data.about);
  info.getUserInfo();
});
profileForm.setEventListeners();

const placeForm = new PopupWithForm("#place-popup", (data) => {
  const card = new Card(data.title, data.link, "#card-template", () => {
    imageOverlay.open(card._imageLink, card._text);
  });
  const cardElement = card.createCard(card._getTemplate());
  cardSection.addItem(cardElement);
  api
    .addCard({
      isLiked: false,
      name: data.title,
      link: data.link,
    })
    .then((res) => {
      if (res.ok) {
        console.log(res);
        console.log("Card submitted succesfully");
      }
    });
  placeForm.reset();
});
placeForm.setEventListeners();

editProfileButton.addEventListener("click", () => {
  profileForm.open();
});

addPlaceButton.addEventListener("click", () => {
  placeForm.open();
});
