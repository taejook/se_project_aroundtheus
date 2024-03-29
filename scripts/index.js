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
}

function openPopUp(modal){
    modal.classList.add('modal_opened');
}


function renderCard(cardData, wrapper){
    const cardElement = getCardElement(cardData);
    wrapper.prepend(cardElement);
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
    cardListEl.prepend(cardElement);
    closePopUp(addCardModal);
};

function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.cards__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    //find delete button
    const deleteButton = cardElement.querySelector('.card__delete-button');
    //add the event lsitener to the delete button
        //cardElement.remove();
    //add click listener to the cardImage element
        //open modal with preview image modal

    likeButton.addEventListener('click', () =>{
        likeButton.classList.toggle('card__like-button_active')
    });
    deleteButton.addEventListener('click', () =>{
        cardElement.remove();
    })
    cardImageEl.addEventListener('click', () => {

        previewImage.src = cardData.link;
        previewDescription.textContent = cardData.name;
        previewImage.alt = `${cardData.name}`;
        openPopUp(previewCardModal);
    });
    cardImageEl.setAttribute('src', cardData.link);
    cardImageEl.setAttribute('alt', cardData.name);
    cardTitleEl.textContent = cardData.name;
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
