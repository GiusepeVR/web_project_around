let editProfileButton = document.querySelector(".profile__edit-button");
let popUpElement = document.querySelector(".popup");
let closePopupButton = document.querySelector(".popup__close-button");

let profileName = document.querySelector(".popup__input_name");
let profileAbout = document.querySelector(".popup__input_about");

function togglePopup() {
  popUpElement.classList.toggle("popup_opened");
}

function renderTexts() {}

editProfileButton.addEventListener("click", togglePopup);
closePopupButton.addEventListener("click", togglePopup);
