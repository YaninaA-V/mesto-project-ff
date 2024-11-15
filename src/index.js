import "./pages/index.css";
import { createCard, deleteCard, handleLikeButton } from "./scripts/card.js";
import { initialCards } from "./scripts/cards.js";
import { openModalWindow, closeModalWindow } from "./scripts/modal.js";

const cardsContainer = document.querySelector(".places__list");

initialCards.forEach(function (elem) {
  const createdCard = createCard(
    { name: elem.name, link: elem.link },
    deleteCard,
    openImagePopup,
    handleLikeButton
  );
  cardsContainer.append(createdCard);
});

const editPopup = document.querySelector(".popup_type_edit");
const openEditPopup = document.querySelector(".profile__edit-button");
const closePopupButtons = document.querySelectorAll(".popup__close");
const newCardPopup = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");
const enlargeImage = document.querySelector(".popup_type_image");
const popupImg = enlargeImage.querySelector(".popup__image");
const imgCap = document.querySelector(".popup__caption");

openEditPopup.addEventListener("click", handleOpenProfilePopup);

closePopupButtons.forEach((popupClose) => {
  popupClose.addEventListener("click", () => {
    const popup = popupClose.closest(".popup");
    closeModalWindow(popup);
  });
});

addCardButton.addEventListener("click", () => {
  openModalWindow(newCardPopup);
});

function openImagePopup(cardData) {
  popupImg.src = cardData.link;
  popupImg.alt = cardData.name;
  imgCap.textContent = cardData.name;
  openModalWindow(enlargeImage);
}

const nameInput = editPopup.querySelector(".popup__input_type_name");
const jobInput = editPopup.querySelector(".popup__input_type_description");
const profilTitle = document.querySelector(".profile__title");
const profilDescription = document.querySelector(".profile__description");

function handleOpenProfilePopup() {
  nameInput.value = profilTitle.textContent;
  jobInput.value = profilDescription.textContent;
  openModalWindow(editPopup);
}

const formProfileElement = editPopup.querySelector(".popup__form");
formProfileElement.addEventListener("submit", handleProfilFormSubmit);

function handleProfilFormSubmit(evt) {
  evt.preventDefault();
  profilTitle.textContent = nameInput.value;
  profilDescription.textContent = jobInput.value;
  closeModalWindow(editPopup);
}

const formAddCard = newCardPopup.querySelector(".popup__form");
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formAddCard.querySelector(".popup__input_type_url");

formAddCard.addEventListener("submit", handleAddCardFormSubmit);
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const imgName = cardNameInput.value;
  const imgLink = cardLinkInput.value;
  const newCardImg = createCard(
    { name: imgName, link: imgLink },
    deleteCard,
    openImagePopup,
    handleLikeButton
  );
  cardsContainer.prepend(newCardImg);
  closeModalWindow(newCardPopup);
  formAddCard.reset();
}
