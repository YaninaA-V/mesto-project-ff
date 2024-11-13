function createCard(cardData, deleteCallback, openImagePopup, likeClick) {
  const cardTemlate = document.querySelector("#card-template").content;
  const cardElement = cardTemlate.querySelector(".places__item").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener("click", () => openImagePopup(cardData));
  likeButton.addEventListener("click", likeClick);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCallback);
  return cardElement;
}

function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, handleLikeButton };
