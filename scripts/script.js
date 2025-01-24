const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const userPopUpElement = document.querySelector("#user-popup");
const placePopUpElement = document.querySelector("#place-popup");
const closeUserPopupButton = document.querySelector(".popup__close-button");
const closePlacePopupButton = document.querySelector("#popup__close-button");

const profileNameInput = document.querySelector(".popup__input_name");
const profileAboutInput = document.querySelector(".popup__input_about");

const placeNameInput = document.querySelector(".popup__input_place");
const placeImageLinkInput = document.querySelector(".popup__input_link");

const storedProfileName = document.querySelector(".profile__name");
const storedProfileAbout = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__form");
const cardsSection = document.querySelector(".photo-grid");
const mainSection = document.querySelector(".content");

const cardTemplate = document.querySelector("#card-template").content;
const popupTemplate = document.querySelector("#popup-template").content;
const popupPrimaryInput = document.querySelector(".popup__input_primary");
const popupSecondaryInput = document.querySelector(".popup__input_secondary");
const closeGenericPopupButton = popupTemplate.querySelector(
  "#popup__generic-close-button"
);

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
];

function toggleUserPopup() {
  userPopUpElement.classList.toggle("popup_opened");
  renderInputTexts();
}

function togglePlacePopup() {
  placePopUpElement.classList.toggle("popup_opened");
}

function toggleGenericPopup(
  primaryPlaceHolder = "hola",
  secondaryPlaceHolder = "hola"
) {
  const newPopup = popupTemplate.cloneNode(true);
  const sectionPopup = popupTemplate.querySelector(".popup");
  const closePopup = popupTemplate.querySelector(
    "#popup__generic-close-button"
  );

  closePopup.addEventListener("click", toggleUserPopup);
  sectionPopup.classList.toggle("popup_opened");
  newPopup.querySelector(".popup__input_primary").placeholder =
    primaryPlaceHolder;
  newPopup.querySelector(".popup__input_secondary").placeholder =
    secondaryPlaceHolder;
  mainSection.prepend(newPopup);
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
  togglePopup();
}

function renderInitialCards(array) {
  array.forEach((element) => {
    createCard(element.name, element.link);
  });
}

function createCard(nameValue, imageValue) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector(".photo-grid__card-title").textContent = nameValue;
  newCard.querySelector(".photo-grid__card-image").src = imageValue;
  cardsSection.append(newCard);
}

editProfileButton.addEventListener("click", toggleUserPopup);
addPlaceButton.addEventListener("click", togglePlacePopup);
//addPlaceButton.addEventListener("click", toggleGenericPopup);
closeUserPopupButton.addEventListener("click", toggleUserPopup);
closeGenericPopupButton.addEventListener("click", toggleGenericPopup);
closePlacePopupButton.addEventListener("click", togglePlacePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
renderInitialCards(initialCards);
