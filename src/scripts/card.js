import { deleteCard, putMyLike, deleteMyLike } from "./api";

function createCard(cardData, openImagePopup, handleLikeButton, myID) {
  const cardTemlate = document.querySelector("#card-template").content;
  const cardElement = cardTemlate.querySelector(".places__item").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCountElement = cardElement.querySelector(".card__likes-count");

  const likesArray = Array.isArray(cardData.likes) ? cardData.likes : [];
  likesCountElement.textContent = likesArray.length; 
  
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener("click", () => openImagePopup(cardData));

 const Liked = likesArray.some((like) => like._id === myID);
  if (Liked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => handleLikeButton(cardData, likeButton, likesCountElement));

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if(cardData.owner._id === myID) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () => {
      deleteCard(cardData._id)
      .then(() => {
        cardElement.remove();
      })
      .catch((error) => {
        console.error("Ошибка при удалении карточки:", error);
      });
  });
  } else {
    deleteButton.style.display = "none";
  }  
  return cardElement;
}

function handleLikeButton(cardData, likeButton, likesCountElement) {
  if(likeButton.classList.contains("card__like-button_is-active")) {
    deleteMyLike(cardData._id)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likesCountElement.textContent = updatedCard.likes.length; 
    })
    .catch((error) => {
      console.error("Произошла ошибка при удалении лайка", error);
    });
  } else {
    putMyLike(cardData._id)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likesCountElement.textContent = updatedCard.likes.length;
    })
    .catch((error) => {
      console.error("Произошла ошибка при добавлении лайка", error);
    });
  }
}

export { createCard, handleLikeButton }
