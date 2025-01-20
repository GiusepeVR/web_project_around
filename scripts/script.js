const editProfileButton = document.querySelector(".profile__edit-button");
const popUpElement = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close-button");

const profileNameInput = document.querySelector(".popup__input_name");
const profileAboutInput = document.querySelector(".popup__input_about");

const storedProfileName = document.querySelector(".profile__name");
const storedProfileAbout = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__form");
const cardsSection = document.querySelector(".photo-grid");
const cardTemplate = document.querySelector("#card-template").content;

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

function togglePopup() {
  popUpElement.classList.toggle("popup_opened");
  renderInputTexts();
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

editProfileButton.addEventListener("click", togglePopup);
closePopupButton.addEventListener("click", togglePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
renderInitialCards(initialCards);
