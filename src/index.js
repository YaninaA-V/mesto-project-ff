import './pages/index.css';
import { initialCards, createCard, deleteCard } from './scripts/card.js';
import { openModalWindow, closeModalWindow } from './scripts/modal.js';

const editPopup = document.querySelector('.popup_type_edit');
const openEditPopup = document.querySelector('.profile__edit-button');
const closePopupButtons = document.querySelectorAll('.popup__close');
const newCardPopup = document.querySelector('.popup_type_new-card');
const openProfilPopup = document.querySelector('.profile__add-button');
const enlargeImage = document.querySelector('.popup_type_image');
const popupImg = enlargeImage.querySelector('.popup__image');
const cardImage = document.querySelectorAll('.card__image');

 


openEditPopup.addEventListener('click', handleOpenProfilePopup);
       

closePopupButtons.forEach((popupClose) => {
    popupClose.addEventListener('click', () => 
    {
        const popup = popupClose.closest('.popup');
        closeModalWindow(popup);
    });
});
 
openProfilPopup.addEventListener('click', () => 
    {
        openModalWindow(newCardPopup);
    });
cardImage.forEach((cardImageElement) => {
    cardImageElement.addEventListener('click', () => 
    {
        openModalWindow(enlargeImage);
        const imgSrc = cardImageElement.getAttribute('src');
        const imgCap = document.querySelector('.popup__caption');
        popupImg.setAttribute('src', imgSrc);  
        imgCap.textContent = cardImageElement.getAttribute('alt');     
    });
});

const nameInput = editPopup.querySelector('.popup__input_type_name');
const jobInput = editPopup.querySelector('.popup__input_type_description'); 
const profilTitle = document.querySelector('.profile__title'); 
const profilDescription = document.querySelector('.profile__description'); 

function handleOpenProfilePopup() {    
    nameInput.value = profilTitle.textContent;
    jobInput.value = profilDescription.textContent;
    openModalWindow(editPopup);
}

const formElement = editPopup.querySelector('.popup__form');
formElement.addEventListener('submit', handleFormSubmit); 

function handleFormSubmit(evt) {
    evt.preventDefault();
    profilTitle.textContent = nameInput.value; 
    profilDescription.textContent = jobInput.value;
    closeModalWindow(editPopup);
}

const placesList = document.querySelector('.places__list');
const imgElement = newCardPopup.querySelector('.popup__form');
imgElement.addEventListener('submit', addingCard);
function addingCard(evt) {
    evt.preventDefault();
    const imgName = imgElement.querySelector('.popup__input_type_card-name').value;
    const imgLink = imgElement.querySelector('.popup__input_type_url').value; 
    const newCardImg = createCard(imgName, imgLink);
    placesList.prepend(newCardImg);
    closeModalWindow(newCardPopup);
    imgElement.reset();
}

  
placesList.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('card__like-button')) { 
        evt.target.classList.toggle('card__like-button_is-active');         
    }
});