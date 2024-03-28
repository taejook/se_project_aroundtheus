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
]
/*Elements*/
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditTitleInput = document.querySelector('#profile-title-input');
const profileEditDescriptionInput = document.querySelector('#profile-description-input');

const profileEditForm = profileEditModal.querySelector('.modal__form');
const cardListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;

/*Buttons*/
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditCloseBtn = profileEditModal.querySelector("#profile-edit-close");
const addNewCardButton = document.querySelector(".profile__add-button");
/*Functions*/
function closePopUp(modal){
    modal.classList.remove('modal_opened');
}

/*function openPopUp(){
    profileEditModal.classList.add('modal_opened');
}*/

function openPopUp(modal){
    modal.classList.add('modal_opened');
}

function handleProfileEditSubmit(e){
    e.preventDefault();
    profileTitle.textContent =profileEditTitleInput.value;
    profileDescription.textContent = profileEditDescriptionInput.value;
    closePopUp();
};

function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.cards__title');
    cardImageEl.setAttribute('src', cardData.link);
    cardImageEl.setAttribute('alt', cardData.name);
    cardTitleEl.textContent = cardData.name;
    return cardElement;
}
/*Event Listeners*/
profileEditBtn.addEventListener('click', () =>{
    profileEditTitleInput.value = profileTitle.textContent;
    profileEditDescriptionInput.value = profileDescription.textContent;
    openPopUp();
});

profileEditForm.addEventListener('submit', handleProfileEditSubmit);
profileEditBtn.addEventListener('click', () => openPopUp(profileEditModal))
profileEditCloseBtn.addEventListener('click',() => closePopUp(profileEditModal));
addNewCardButton.addEventListener('click', () => openPopUp(addCardModal));
addNewCardButton.addEventListener('click', () => closePopUp(addCardModal));
initialCards.forEach((cardData) =>{
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
});