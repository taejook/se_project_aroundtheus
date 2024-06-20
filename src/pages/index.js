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
  avatarButton,
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
    authorization: "41597df2-eb93-4b41-8bf1-f4a542a9ea54",
    "Content-Type": "application/json"
  }
});

//Class Instances
const previewImageModal = new PopupWithImage({ popupSelector: "#preview-image-modal" });
const popupDelete = new PopupWithDelete({ popupSelector: "#delete-card-modal" });

const userInfo = new UserInfo(".profile__title", ".profile__description", ".profile__image");

let section;

api.getInitialCards().then((initialCards) => {
  section = new Section(
    {
      items: initialCards,
      renderer: (data) => {
        const cardElement = new Card(
          data,
          "#card-template",
          handleImageClick,
          handleDelete,
          handleLikeCard
        );
        section.addItems(cardElement.getView());
      },
    },
    ".cards__list"
  );
  section.renderItems();
})
.catch((err) => {
  console.error(err);
});
api.fetchUserInfo().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
  });
  userInfo.setAvatar({ avatar: userData.avatar });
})
.catch((err) => {
  console.error(err);
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
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    });
}

function handleDelete(card) {
  popupDelete.open();
  popupDelete.setSubmitAction(() => {
    popupDelete.renderLoading(true);
    api
      .deleteInitialCards(card.id)
      .then(() => {
        card.handleDelete();
        popupDelete.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupDelete.renderLoading(false);
      });
  });
}

function handleLikeCard(card) {
  if (card.isLiked) {
    api
      .unlikeCard(card.id)
      .then(() => {
        card.setIsLiked(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (!card.isLiked) {
    api
      .likeCard(card.id)
      .then(() => {
        card.setIsLiked(true);
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
      section.addItems(card);
      addCardPopUp.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopUp.renderLoading(false);
    });
}



//Event Handlers
function handleProfileEditFormSubmit(inputValues) {
  editProfilePopUp.renderLoading(true);
  api
    .editUserInfo(inputValues)
    .then((newUserData) => {
      userInfo.setUserInfo(newUserData);
      editProfilePopUp.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopUp.renderLoading(false);
    });
}

function handleImageClick(cardData) {
  previewImageModal.open(cardData);
}

/*Event Listeners*/
//add new Card button
addCardButton.addEventListener("click", () => {
  addCardPopUp.open();
  addFormValidator.toggleButtonState();
});

profileEditBtn.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  profileTitleInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.about;
  editProfilePopUp.open();
  editFormValidator.toggleButtonState();
});

avatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarFormValidator.toggleButtonState();
});


const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);
const avatarFormValidator = new FormValidator(settings, avatarForm);

//function renderCard(cardData) {
  //const card = createCard(cardData);
  //section.addItems(card);
//}

//Validation

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

addCardPopUp.setEventListeners();
editProfilePopUp.setEventListeners();
previewImageModal.setEventListeners();
popupDelete.setEventListeners();
editAvatarPopup.setEventListeners();