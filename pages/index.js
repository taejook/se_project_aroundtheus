import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  cardListEl,
  profileEditBtn,
  profileEditForm,
  addCardForm,
  addNewCardButton,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";
import "./index.css";

//const card = new Card(cardData, '#card-template');
//card._getView();
/*Functions*/

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
  modal.removeEventListener("mousedown", closeModalOverlay);
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function closeModalOverlay(e) {
  if (e.target === e.currentTarget) {
    closePopUp(e.currentTarget);
  }
}

function closeModalEscape(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopUp(modalOpened);
  }
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileEditTitleInput.value;
  profileDescription.textContent = profileEditDescriptionInput.value;
  closePopUp(profileEditModal);
  profileEditValidator.disableButton();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopUp(addCardModal);
  e.target.reset();
  addCardValidator.disableButton();
}

function handleImageClick(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name + " " + "Image";
  previewDescription.textContent = cardData.name;
  openPopUp(previewCardModal);
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}
/*Event Listeners*/
profileEditBtn.addEventListener("click", () => {
  profileEditTitleInput.value = profileTitle.textContent;
  profileEditDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});
// Form Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
profileEditBtn.addEventListener("click", () => {
  openPopUp(profileEditModal);
});
profileEditCloseBtn.addEventListener("click", () =>
  closePopUp(profileEditModal)
);
addNewCardButton.addEventListener("click", () => openPopUp(addCardModal));
closeNewCardButton.addEventListener("click", () => closePopUp(addCardModal));
previewCloseButton.addEventListener("click", () =>
  closePopUp(previewCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//Validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileEditValidator = new FormValidator(config, profileEditForm);
const addCardValidator = new FormValidator(config, addCardFormElement);

profileEditValidator.enableValidation();
addCardValidator.enableValidation();
