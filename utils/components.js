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

  /*Elements*/
  export const profileEditModal = document.querySelector("#profile-edit-modal");
export const addCardModal = document.querySelector("#add-card-modal");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const profileEditTitleInput = document.querySelector("#profile-title-input");
export const profileEditDescriptionInput = document.querySelector(
  "#profile-description-input"
);

export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardFormElement = addCardModal.querySelector(".modal__form");
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
export const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
/*Buttons*/
export const profileEditBtn = document.querySelector("#profile-edit-button");
export const profileEditCloseBtn = profileEditModal.querySelector(
  "#profile-edit-close"
);
export const addNewCardButton = document.querySelector(".profile__add-button");
export const closeNewCardButton = addCardModal.querySelector(".modal__close");
export const cardDeleteButton = document.querySelector("card__delete-button");

export const previewCardModal = document.querySelector("#preview-image-modal");
export const previewImage = document.querySelector(".modal__preview-image");
export const previewDescription = document.querySelector(
  ".modal__preview-description"
);
export const previewCloseButton = previewCardModal.querySelector(".modal__close");