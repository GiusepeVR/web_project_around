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
  nameInput,
  jobInput,
} from "../utils/constants.js";

const api = new Api("https://around-api.es.tripleten-services.com/v1", {
  authorization: "e4cbebb7-eb58-4a49-8e2e-9574a704497b",
  "Content-Type": "application/json",
});

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
          const cardDeleteWarning = new PopupWithForm(
            "#delete-popup",
            (value) => {
              console.log(value);
              if (value.delete === "true") {
                api.deleteCard(element._id).then((res) => {
                  console.log(res);
                  card.removeCard();
                });
              }
            }
          );
          cardDeleteWarning.setEventListeners();
          cardDeleteWarning.open();
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
  userProfilePictureSelector: ".profile__avatar",
});

const profileForm = new PopupWithForm("#user-popup", (data) => {
  info.getUserInfo();
  info.setUserInfo(data.name, data.about);
  api
    .updateUserData({ name: data.name, about: data.about })
    .then((res) => console.log(res));
});
profileForm.setEventListeners();

const placeForm = new PopupWithForm("#place-popup", (data) => {
  const card = new Card(
    data.title,
    data.link,
    "#card-template",
    false,
    () => {
      imageOverlay.open(card._imageLink, card._text);
    },
    () => {
      imageOverlay.open(card._imageLink, card._text);
    },
    () => {
      const cardDeleteWarning = new PopupWithForm("#delete-popup", (value) => {
        console.log(value);
        if (value.delete === "true") {
          api.deleteCard(element._id).then((res) => {
            console.log(res);
            card.removeCard();
          });
        }
      });
      cardDeleteWarning.setEventListeners();
      cardDeleteWarning.open();
    },
    () =>
      api
        .handleCardLike(element._id, element.isLiked)
        .then((res) => console.log(res))
  );
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

api.getUserData().then((data) => {
  console.log(data);
  info.setUserInfo(data.name, data.about);
  nameInput.value = data.name;
  jobInput.value = data.about;
});
