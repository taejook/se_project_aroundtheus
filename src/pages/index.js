import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import '../pages/index.css';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDelete from "../components/PopupWithDelete.js"
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import Popup from "../components/Popup.js";
import {
  initialCards,
  cardListEl,
  profileEditBtn,
  profileEditForm,
  addCardForm,
  addCardModal,
  addCardButton,
  addNewCardButton,
  profileTitleInput,
  profileDescriptionInput,
  avatarForm,
  settings,
} from "../utils/constants.js";
import "./index.css";

//const card = new Card(cardData, '#card-template');
//card._getView();
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json"
  }
});

//Class Instances
const previewImageModal = new PopupWithImage({ popupSelector: "#preview-image-modal" });
const popupDelete = new PopupWithDelete({ popupSelector: "#delete-card-modal" });

const profileEditModal = new PopupWithForm(
  { popupSelector: "#profile-edit-modal" },
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

api
  .getInitialCards()
  .then((cardItems) => {
    section.renderItems(cardItems);
  })
  .catch((err) => console.log(err));

api
    .fetchUserInfo()
    .then((user) => {
      userInfo.setUserInfo(user);
    })
    .catch((err) => {
      console.log(err);
    });

    const addCardPopUp = new PopupWithForm(
      { popupSelector: "#add-card-modal" },
      handleAddCardFormSubmit
    );

    const editProfilePopUp = new PopupWithForm(
      { popupSelector: "#profile-edit-modal" },
      handleProfileEditFormSubmit
    );

    const editAvatarPopup = new PopupWithForm(
      { popupSelector: "#avatar-edit-modal" },
      handleAvatarSubmit
    );

/*Functions*/

function createCard(data) {
  const card = new Card(data, "#card-template",
    handleImageClick,
    handleDelete,
    handleLikeCard
  ).getView();
  return card;
}

function handleAvatarSubmit(inputValues) {
  editAvatarPopup.renderLoading(true);
  api
    .editAvatar({ avatar: inputValues.link })
    .then((newAvatar) => {
      userInfo.setAvatar(newAvatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
      editAvatarPopup.close();
    });
}

function handleDelete(card) {
  popupDelete.open();
  popupDelete.setSubmitAction(() => {
    api
      .deleteInitialCards(card.id)
      .then(() => {
        card.handleDelete();
        popupDelete.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleLikeCard(card) {
  if (!card.isLiked) {
    api
      .likeCard(card.id)
      .then(() => {
        card.isLiked = true;
        card.updateLikesView();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .unlikeCard(card.id)
      .then(() => {
        card.isLiked = false;
        card.updateLikesView();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleAddCardFormSubmit(inputValues) {
  addCardPopUp.renderLoading(true);
  api
    .addCard({
      name: inputValues.name,
      link: inputValues.link,
    })
    .then((data) => {
      const card = createCard(data);
      cardSection.addItem(card);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopUp.renderLoading(false);
      addCardPopUp.close();
    });
}

function handleProfileEditFormSubmit(inputValues) {
  editProfilePopUp.renderLoading(true);
  api
    .editUserInfo(inputValues)
    .then((newUserData) => {
      userInfo.setUserInfo(newUserData);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopUp.renderLoading(false);
      editProfilePopUp.close();
    });
}


//Event Handlers
function handleProfileEditSubmit(inputValues) {// {title: jacke , description: exploer}
  editFormValidator.resetValidation();
  userInfo.setUserInfo({name: inputValues.title, description: inputValues.description});
  profileEditModal.close();
  editFormValidator.disableButton();
}

function handleAddCardSubmit(inputValues) {
  console.log(inputValues);
  renderCard(inputValues);
  addCardModal.close();
  addFormValidator.disableButton();
  addCardForm.reset();
}

function handleImageClick(cardData) {
  previewImageModal.open(cardData);
}

/*Event Listeners*/
profileEditBtn.addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo();
  console.log(currentUserData);
  editFormValidator.resetValidation();
  profileTitleInput.value = currentUserData.name;
  profileDescriptionInput.value = currentUserData.description;
  profileEditModal.open();
});

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);
const avatarFormValidator = new FormValidator(settings, avatarForm);

//add new Card button
console.log(addCardModal); // Log to ensure it has the open method

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.profile__add-button').addEventListener('click', () => {
        if (typeof addCardModal.open === 'function') {
            addCardModal.open();
        } else {
            console.error('addCardModal.open is not a function');
        }
    });
});

function renderCard(cardData) {
  const card = createCard(cardData);
  section.addItems(card);
}

//Validation

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

addCardPopUp.setEventListeners();
editProfilePopUp.setEventListeners();
previewImageModal.setEventListeners();
popupDelete.setEventListeners();
editAvatarPopup.setEventListeners();