import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import '../pages/index.css';
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
  settings,
} from "../utils/components.js";
import "./index.css";

//const card = new Card(cardData, '#card-template');
//card._getView();

//Class Instances
const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

const addCardModal = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
addCardModal.setEventListeners();

const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditModal.setEventListeners();

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

section.renderItems();

const userInfo = new UserInfo(".profile__title", ".profile__description");

/*Functions*/

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick).getView();
  return card;
}

//Event Handlers
function handleProfileEditSubmit(inputValues) {// {title: jacke , description: exploer}
  userInfo.setUserInfo({name: inputValues.title, description: inputValues.description});
  profileEditModal.close();
  profileEditValidator.disableButton();
}

function handleAddCardSubmit(inputValues) {
  console.log(inputValues);
  renderCard(inputValues);
  addCardModal.close();
  addCardValidator.disableButton();
}

function handleImageClick(cardData) {
  previewImageModal.open(cardData);
}

/*Event Listeners*/
profileEditBtn.addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo();
  console.log(currentUserData);
  profileEditValidator.resetValidation();
  profileTitleInput.value = currentUserData.name;
  profileDescriptionInput.value = currentUserData.description;
  profileEditModal.open();
});

//add new Card button
addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItems(card);
}

//Validation

const profileEditValidator = new FormValidator(settings, profileEditForm);
const addCardValidator = new FormValidator(settings, addCardForm);

profileEditValidator.enableValidation();
addCardValidator.enableValidation();
