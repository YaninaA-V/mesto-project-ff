const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

 function createCard(name, link, deleteCallback) {
  const cardTemlate = document.querySelector('#card-template').content;
  const cardElement = cardTemlate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCallback);
  return cardElement   
};

initialCards.forEach((elem) => {
  document.querySelector('.places__list').append(createCard(elem.name, elem.link, deleteCard))
});

 function deleteCard(event) {
  event.target.closest('.places__item').remove();
}

export { initialCards, createCard, deleteCard };