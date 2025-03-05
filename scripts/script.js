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

const profileNameInput = document.querySelector(".popup__input_name");
const profileAboutInput = document.querySelector(".popup__input_about");

const placeNameInput = document.querySelector(".popup__input_place");
const placeImageLinkInput = document.querySelector(".popup__input_link");

const storedProfileName = document.querySelector(".profile__name");
const storedProfileAbout = document.querySelector(".profile__description");

const profileFormElement = document.querySelector("#profile-form");
const placeFormElement = document.querySelector("#place-form");

const cardsSection = document.querySelector(".photo-grid");
const mainSection = document.querySelector(".content");

const cardTemplate = document.querySelector("#card-template");
const imagePopupTemplate = document.querySelector(
  "#popup-image-template"
).content;

let selectedImage = "images/grid-picture-0.png";

const imagePopupClone = imagePopupTemplate.cloneNode(true);
mainSection.append(imagePopupClone);
const imagePopup = document.querySelector("#image-overlay");
const imagePopupImageTag = document.querySelector(".image-popup__img");
const imagePopupImageLabel = document.querySelector(".image-popup__label");
const imagePopupImageCloseButton = document.querySelector(
  ".image-popup__close-button"
);

const popupNodeList = document.querySelectorAll(".image-popup, .popup");
const popupList = Array.from(popupNodeList);

imagePopupImageCloseButton.addEventListener("click", function () {
  toggleImagePopup();
});
imagePopupImageTag.src = selectedImage;

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
  renderInputTexts();
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
      toggleUserPopup();
      break;
    case placePopUpElement.classList.contains("popup_opened"):
      togglePlacePopup();
      break;
    case imagePopup.classList.contains("image-popup_opened"):
      toggleImagePopup();
      break;
  }
}

function renderInputTexts() {
  const profileName = storedProfileName.textContent;
  const profileAbout = storedProfileAbout.textContent;
  profileNameInput.value = profileName;
  profileAboutInput.value = profileAbout;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  storedProfileName.textContent = profileNameInput.value;
  storedProfileAbout.textContent = profileAboutInput.value;
  toggleUserPopup();
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  let userInputImageLink = placeImageLinkInput.value;
  let userInputPlaceName = placeNameInput.value;
  createCard(userInputPlaceName, userInputImageLink);
  togglePlacePopup();
}

function renderInitialCards(array) {
  array.forEach((element) => {
    createCard(element.name, element.link);
  });
}

function createCard(nameValue, imageValue) {
  const newCard = cardTemplate
    .cloneNode(true)
    .content.querySelector(".photo-grid__card");
  const cardButton = newCard.querySelector(".photo-grid__card-button_delete");
  newCard.querySelector(".photo-grid__card-title").textContent = nameValue;

  newCard.querySelector(".photo-grid__card-image").src = imageValue;
  cardButton.addEventListener("click", function (evt) {
    newCard.remove();
  });
  newCard
    .querySelector(".photo-grid__card-button_like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("photo-grid__card-button_like_active");
    });
  newCard
    .querySelector(".photo-grid__card-image")
    .addEventListener("click", function (evt) {
      imagePopupImageTag.src = imageValue;
      imagePopupImageLabel.textContent = nameValue;
      toggleImagePopup();
      console.log(selectedImage);
    });
  cardsSection.prepend(newCard);
}

editProfileButton.addEventListener("click", toggleUserPopup);
addPlaceButton.addEventListener("click", togglePlacePopup);
closeUserPopupButton.addEventListener("click", toggleUserPopup);
closePlacePopupButton.addEventListener("click", togglePlacePopup);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
placeFormElement.addEventListener("submit", handlePlaceFormSubmit);
renderInitialCards(initialCards);

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
