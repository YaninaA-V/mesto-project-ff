import "./pages/index.css";
import { 
  createCard, 
  handleLikeButton 
} from "./scripts/card.js";
import { 
  openModalWindow, 
  closeModalWindow 
} from "./scripts/modal.js";
import { 
  enableValidation, 
  clearValidation 
} from "./scripts/validation.js";
import { 
  getUserInfo, 
  getInitialCards, 
  patchUserInfoChange, 
  postNewCard,
  patchUserAvatarChange 
} from "./scripts/api.js"; 

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editPopup = document.querySelector(".popup_type_edit");
const openEditPopup = document.querySelector(".profile__edit-button");
const closePopupButtons = document.querySelectorAll(".popup__close");
const newCardPopup = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");
const enlargeImage = document.querySelector(".popup_type_image");
const popupImg = enlargeImage.querySelector(".popup__image");
const imgCap = document.querySelector(".popup__caption");
const addForm = document.forms["new-place"];

const cardsContainer = document.querySelector(".places__list");

const nameInput = editPopup.querySelector(".popup__input_type_name");
const jobInput = editPopup.querySelector(".popup__input_type_description");
const profilTitle = document.querySelector(".profile__title");
const profilDescription = document.querySelector(".profile__description");

const formAddCard = newCardPopup.querySelector(".popup__form");
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formAddCard.querySelector(".popup__input_type_url");

const formProfileElement = editPopup.querySelector(".popup__form");

const profilAvatar = document.querySelector(".profile__image");   
const avatarEditButton = document.querySelector(".avatar__edit-button");
const avatarPopup = document.querySelector(".popup_type_new-avatar");  
const avatarForm = document.forms['edit-avatar'];  
const avatarInputForm = avatarForm.elements.link;


let myID = ""; /*myID: 79ec35307c6023f9546d4e82*/

function openImagePopup(cardData) {
  popupImg.src = cardData.link;
  popupImg.alt = cardData.name;
  imgCap.textContent = cardData.name;
  openModalWindow(enlargeImage);
}

function handleProfilFormSubmit(evt) {
  evt.preventDefault();
  const button = editPopup.querySelector(".popup__button");
  button.textContent = "Сохранение..."
  patchUserInfoChange(nameInput.value, jobInput.value)
   .then(() => {
    profilTitle.textContent = nameInput.value;
    profilDescription.textContent = jobInput.value;
    closeModalWindow(editPopup)
   })  
  .catch(err => console.log(err))
  .finally(() => {
    button.textContent = "Сохранить"
  })
}

function handleOpenProfilePopup() {   
  nameInput.value = profilTitle.textContent;
  jobInput.value = profilDescription.textContent;
  clearValidation(formProfileElement, validationConfig);
  openModalWindow(editPopup);
}

function handleAddCardFormSubmit(evt) {   
  evt.preventDefault();
  const imgName = cardNameInput;  
  const imgLink = cardLinkInput;

  const button = newCardPopup.querySelector(".popup__button");
  button.textContent = "Сохранение..."

  postNewCard(imgName.value, imgLink.value)
   .then(newCard => {
    const newCardImg = createCard(
    { name: newCard.name, link: newCard.link, owner: newCard.owner, _id: newCard._id },
    openImagePopup,
    handleLikeButton,
    myID    
  );

  cardsContainer.prepend(newCardImg);
  closeModalWindow(newCardPopup);
  formAddCard.reset();
   })
   .catch(err => console.log(err))
  .finally(() => {
    button.textContent = "Сохранить"
  })      
}

function handleProfilAvatarSubmit(evt) {
  evt.preventDefault();

  const button = avatarPopup.querySelector(".popup__button"); 
  button.textContent = "Сохранение..."

  patchUserAvatarChange(avatarInputForm.value)
  .then(userData => {
    profilAvatar.style.backgroundImage = `url(${userData.avatar})`;  
    closeModalWindow(avatarPopup);  
    avatarForm.reset();
  })
  .catch(err => console.log(err))
  .finally(() => {
    button.textContent = "Сохранить"
  })
}

Promise.all([getUserInfo(), getInitialCards()]).then(([userData, result]) => { 
  profilTitle.textContent = userData.name;
  profilDescription.textContent = userData.about;
  profilAvatar.style.backgroundImage = `url(${userData.avatar})`;
  myID = userData["_id"];

  result.forEach(function(card) {
    const createdCard = createCard(card,
      openImagePopup,
      handleLikeButton,
      myID
    );
    cardsContainer.append(createdCard);
  });
})

openEditPopup.addEventListener("click", handleOpenProfilePopup);

addCardButton.addEventListener("click", () => {
  clearValidation(addForm, validationConfig);  
  openModalWindow(newCardPopup);
});

avatarEditButton.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModalWindow(avatarPopup);  
});

closePopupButtons.forEach((popupClose) => {
  popupClose.addEventListener("click", () => {
    const popup = popupClose.closest(".popup");
    closeModalWindow(popup);
  });
});

formProfileElement.addEventListener("submit", handleProfilFormSubmit);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);
avatarForm.addEventListener("submit", handleProfilAvatarSubmit);

enableValidation(validationConfig);
