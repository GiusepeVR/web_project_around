const editProfileButton = document.querySelector(".profile__edit-button");
const popUpElement = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close-button");

const profileNameInput = document.querySelector(".popup__input_name");
const profileAboutInput = document.querySelector(".popup__input_about");

const storedProfileName = document.querySelector(".profile__name");
const storedProfileAbout = document.querySelector(".profile__description");
const formElement = document.querySelector(".popup__form");

function togglePopup() {
  popUpElement.classList.toggle("popup_opened");
  renderInputTexts();
}

function renderInputTexts() {
  let profileName = storedProfileName.textContent;
  let profileAbout = storedProfileAbout.textContent;
  profileNameInput.value = profileName;
  profileAboutInput.value = profileAbout;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  storedProfileName.textContent = profileNameInput.value;
  storedProfileAbout.textContent = profileAboutInput.value;
  togglePopup();
}

editProfileButton.addEventListener("click", togglePopup);
closePopupButton.addEventListener("click", togglePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);
