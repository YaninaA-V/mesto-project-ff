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

