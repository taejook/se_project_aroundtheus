import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import '../pages/index.css';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
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
  deleteCardModal,
  deleteCardButton
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
  cardListEl
);

const popupWithDeleteCard = new PopupWithDelete(
  deleteCardModal,
  handleDeleteCardFormSubmit
);
popupWithDeleteCard.setEventListeners();

const userInfo = new UserInfo(".profile__title", ".profile__description");

const api = new Api ({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ce0e6719-cfff-44ae-95da-d365cf911af3",
    "Content-Type": "application/json",
  },
});

/*Functions*/

function createCard(data) {
  const card = new Card(data, "#card-template", 
  handleImageClick,  
  handleDeleteClick,
  handleLikeClick,
  handleDislikeClick).getView();
  return card;
}

//Event Handlers
function handleProfileEditSubmit(inputValues) {// {title: jacke , description: exploer}
  profileEditValidator.resetValidation();
  userInfo.setUserInfo({name: inputValues.title, description: inputValues.description});
  profileEditModal.close();
  profileEditValidator.disableButton();
}

function handleAddCardSubmit(inputValues) {
  console.log(inputValues);
  renderCard(inputValues);
  addCardModal.close();
  addCardValidator.disableButton();
  addCardForm.reset();
}

function handleImageClick(cardData) {
  previewImageModal.open(cardData);
}

function handleDeleteCardFormSubmit(cardEl){
  api.deleteCards(cardEl.id).then(() => {
    cardEl.remove();
    setTimeout(() => {
      deleteCardButton.textContent = "Yes";
    }, 500);
  })
}

function handleDeleteClick(cardEl){
  PopupWithDelete.setSubmitAction(() => {
    api.deleteCard(cardEl._id).then(() => {
      cardEl.remove();
      setTimeout(() => {
        deleteCardButton.textContent = "Yes";
      }, 500);
    });
  });
}

function handleLikeClick(cardId) {
  api.toggleCardLike(cardId);
}

function handleDislikeClick(cardId) {
  api.toggleCardDislike(cardId);
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

//APIS

api
  .getInitialCards()
  .then((cards)=>{
    section.setItems(cards);
    section.renderItems();
  }) 
  .catch((err) => {
    alert(`${err} Failed to get cards.`);
  });

api
  .getUserInfo()
  .then((info) => {
    userInfo.setUserInfo({
      name: info.title,
      description: info.description,
    });
  })
    .catch((err) => {
      alert(`${err} Failed to get user info.`);
  });

//Validation

const profileEditValidator = new FormValidator(settings, profileEditForm);
const addCardValidator = new FormValidator(settings, addCardForm);

profileEditValidator.enableValidation();
addCardValidator.enableValidation();

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "ce0e6719-cfff-44ae-95da-d365cf911af3"
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });