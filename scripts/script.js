let editProfileButton = document.querySelector(".profile__edit-button");
let popUpElement = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close-button");

let profileNameInput = document.querySelector(".popup__input_name");
let profileAboutInput = document.querySelector(".popup__input_about");

let storedProfileName = document.querySelector(".profile__name");
let storedProfileAbout = document.querySelector(".profile__description");
let formElement = document.querySelector(".popup__form");

function togglePopup() {
  popUpElement.classList.toggle("popup_opened");
  renderInputTexts();
}

function renderInputTexts() {
  let profileName = storedProfileName.innerHTML;
  let profileAbout = storedProfileAbout.innerHTML;
  profileNameInput.value = profileName;
  profileAboutInput.value = profileAbout;
}

editProfileButton.addEventListener("click", togglePopup);
closePopupButton.addEventListener("click", togglePopup);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector(".popup__input_name");
  let jobInput = document.querySelector(".popup__input_about");

  storedProfileName.textContent = nameInput.value;
  storedProfileAbout.textContent = jobInput.value;
  togglePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
