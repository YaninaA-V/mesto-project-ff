function createCard (name, link) {
    const cardTemlate = document.querySelector('#card-template').content;
    const cardElement = cardTemlate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    document.querySelector('.places__list').append(cardElement); 
    const deleteButton = cardElement.querySelector('.card__delete-button');
deleteButton.addEventListener('click', function (event) {
    event.target.closest('.places__item ').remove();
   }); 
}
initialCards.forEach(elem => createCard(elem.name, elem.link));


