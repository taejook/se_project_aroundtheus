import Card from "../components/Card.js";
import Api from "../components/Api.js";
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
  deleteCardModal,
  deleteCardButton,
  loadingButtonText,
  cardEditForm,
  addCardForm,
  profilePic,
  profileDescription,
  addNewCardButton,
  profileTitle,
  profileTitleInput,
  cardEditModal,
  profileEditModal,
  profileDescriptionInput,
  profileImageModal,
  profilePicModalInput,
  settings,
} from "../utils/components.js";
import "./index.css";

//const card = new Card(cardData, '#card-template');
//card._getView();

//Class Instances
const previewImageModal = new PopupWithImage("#preview-image-modal");
previewImageModal.setEventListeners();

const popupProfileForm = new PopupWithForm(
  profileEditModal,
  handleProfileEditSubmit,
  loadingButtonText
);
const popupCardForm = new PopupWithForm(
  cardEditModal,
  handleAddCardSubmit,
  loadingButtonText
);
const popupProfileImageForm = new PopupWithForm(
  profileImageModal,
  handleProfileImageFormSubmit,
  loadingButtonText
);
popupProfileForm.setEventListeners();
popupCardForm.setEventListeners();
popupProfileImageForm.setEventListeners();

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

const popupWithDeleteCard = new popupWithDeleteCard(
  deleteCardModal,
  loadingButtonText
);
popupWithDeleteCard.setEventListeners();


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "41e13be6-9869-4779-8cec-7a871b9f5d1d",
    "Content-Type": "application/json",
  },
});

api.getAllData()
.then(([userInfo, cards]) => {
  renderUserInfo(userInfo);
  renderCard(cards);
})
.catch(error => {
  console.error('Error fetching data:', error);
});

api
  .getInitialCards()
  .then((cardItems) => {
    section.renderItems(cardItems);
  })
  .catch((err) => console.log(err));


api
  .getUserInfo()
  .then((res) => {
    userInfo.setAvatar(res);

    return userInfo.setUserInfo({
      nameInput: res.title,
      descriptionInput:res.description,
    });
  })
  .catch((err) => console.log(err));

const userInfo = new UserInfo({
    nameSelector: profileTitle,
    jobSelector: profileDescription,},
    profilePic
  );

//Event Handlers
function handleProfileEditSubmit(inputValues) {// {title: jacke , description: exploer}
  api
    .updateUserInfo({
      title: inputValues.title,
      description: inputValues.description,
    })
    .then(() => {
      popupProfileForm.showLoading();
      userInfo.setUserInfo({
        nameInput: inputValues.title,
        descriptionInput: inputValues.description,
      });
      popupProfileForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupProfileForm.hideLoading();
    });
}

function handleAddCardSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.description;
  api
    .addCard({ name: name, link: link })
    .then(() => {
      popupCardForm.showLoading();
      renderCard({ name, link });
      popupCardForm.close();
      cardEditForm.reset();
      addFormValidator.toggleButtonState();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupCardForm.hideLoading();
    });
}

function handleProfileEditSubmit(inputValues) {
  api
    .updateProfileInfo({
      name: inputValues.title,
      about: inputValues.description,
    })
    .then(() => {
      popupProfileForm.showLoading();
      userInfo.setUserInfo({
        nameInput: inputValues.title,
        descriptionInput: inputValues.description,
      });
      popupProfileForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupProfileForm.hideLoading();
    });
}

function handleProfileImageFormSubmit(data) {
  profilePic.src = profilePicModalInput.value;

  api
    .updateProfilePic(data)
    .then(() => {
      popupProfileImageForm.showLoading();
      popupProfileImageForm.close();
      profileImageEditForm.reset();
      addFormValidator.toggleButtonState();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupProfileImageForm.hideLoading();
    });
}

function handleImageClick(cardData) {
  previewImageModal.open(cardData);
}

function handleDeleteClick(cardEl) {
  popupWithDeleteCard.open();
  popupWithDeleteCard.setSubmitAction(() => {
    popupWithDeleteCard.showLoading();
    return api
      .deleteCards(cardEl._id)
      .then(() => {
        cardEl.remove();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupWithDeleteCard.hideLoading();
      });
  });
}

function handleLikeClick(cardId) {
  return api.toggleCardLike(cardId);
}

function handleDislikeClick(cardId) {
  return api.toggleCardDislike(cardId);
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
  const cardElement = new Card(
    cardData,
    ".card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    handleDislikeClick
  ).getview();
  section.addItem(cardElement);
}

//Validation

const profileEditValidator = new FormValidator(settings, profileEditForm);
const addCardValidator = new FormValidator(settings, addCardForm);

profileEditValidator.enableValidation();
addCardValidator.enableValidation();
