export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const formList = document.querySelectorAll(".modal__form");
export const profileEditBtn = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const addCardModal = document.querySelector("#add-card-modal");
export const previewImageModal = document.querySelector("#preview-image-modal");
export const profileModalClose = profileEditModal.querySelector(
  "#profile-modal-close"
);
export const addCardModalClose = addCardModal.querySelector(
  "#add-card-modal-close"
);
export const previewModalClose = previewImageModal.querySelector(
  "#preview-modal-close"
);
export const previewImageEl = document.querySelector(".modal__preview-image");
export const previewNameEl = document.querySelector(".modal__preview-name");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

export const profileEditForm = document.querySelector("#profile-edit-form");
export const addCardForm = document.querySelector("#add-card-form");
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

export const addNewCardButton = document.querySelector(".profile__add-button");

export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const cardTitleInput = addCardForm.querySelector(
  ".modal__input_type_title"
);
export const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

export const closeButtons = document.querySelectorAll(".modal__close");

export const addCardButton = addCardModal.querySelector("#add-modal-button");

export const deleteCardModal = document.querySelector("#delete-image-modal");

export const deleteCardButton = deleteCardModal.querySelector(".modal__button");

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};