import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards=[

{
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
},

{
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
},
{
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
},

{
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
},

{
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
},

{
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
}
];

const cardData = {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
}

//const card = new Card(cardData, '#card-template');
//card._getView();
/*Elements*/
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditTitleInput = document.querySelector('#profile-title-input');
const profileEditDescriptionInput = document.querySelector('#profile-description-input');

const profileEditForm = profileEditModal.querySelector('.modal__form');
const addCardFormElement = addCardModal.querySelector('.modal__form');
const cardListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const cardTitleInput = addCardFormElement.querySelector('.modal__input_type_title');
const cardUrlInput = addCardFormElement.querySelector('.modal__input_type_url');
/*Buttons*/
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditCloseBtn = profileEditModal.querySelector("#profile-edit-close");
const addNewCardButton = document.querySelector(".profile__add-button");
const closeNewCardButton = addCardModal.querySelector('.modal__close');
const cardDeleteButton = document.querySelector('card__delete-button');

const previewCardModal = document.querySelector('#preview-image-modal');
const previewImage = document.querySelector('.modal__preview-image');
const previewDescription = document.querySelector('.modal__preview-description');
const previewCloseButton = previewCardModal.querySelector('.modal__close')
/*Functions*/

function closePopUp(modal){
    modal.classList.remove('modal_opened');
    document.removeEventListener("keydown", closeModalEscape);
    modal.removeEventListener("mousedown", closeModalOverlay);
}

function openPopUp(modal){
    modal.classList.add('modal_opened');
    document.addEventListener("keydown", closeModalEscape);
    modal.addEventListener("mousedown", closeModalOverlay);
}


function renderCard(cardData, wrapper){
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

function handleProfileEditSubmit(e){
    e.preventDefault();
    profileTitle.textContent =profileEditTitleInput.value;
    profileDescription.textContent = profileEditDescriptionInput.value;
    closePopUp(profileEditModal);
};

function handleAddCardFormSubmit(e){
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({name, link}, cardListEl);
    closePopUp(addCardModal);
    e.target.reset();
};

function handleImageClick() {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name + " " + "Image";
    previewDescription.textContent = cardData.name;
    openPopUp(previewCardModal);
};

function getCardElement(cardData){
    const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}
/*Event Listeners*/
profileEditBtn.addEventListener('click', () =>{
    profileEditTitleInput.value = profileTitle.textContent;
    profileEditDescriptionInput.value = profileDescription.textContent;
    openPopUp(profileEditModal);
});
// Form Listeners
profileEditForm.addEventListener('submit', handleProfileEditSubmit);
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);
profileEditBtn.addEventListener('click', () => {
    openPopUp(profileEditModal)
});
profileEditCloseBtn.addEventListener('click',() => closePopUp(profileEditModal));
addNewCardButton.addEventListener('click', () => openPopUp(addCardModal));
closeNewCardButton.addEventListener('click', () => closePopUp(addCardModal));
previewCloseButton.addEventListener('click', () => closePopUp(previewCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//Validation
const validationSettings = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };
  
  const editFormElement = profileEditModal.querySelector(".modal__form");
  const addFormElement = document.querySelector("#add-card-form");
  const editFormValidator = new FormValidator(
    validationSettings,
    editFormElement
  );
  const addFormValidator = new FormValidator(validationSettings, addFormElement);
