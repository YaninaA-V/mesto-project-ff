(()=>{"use strict";function e(e,t,n,r){var o=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),c=o.querySelector(".card__image"),p=o.querySelector(".card__title"),u=o.querySelector(".card__like-button");return c.alt=e.name,c.src=e.link,p.textContent=e.name,c.addEventListener("click",(function(){return n(e)})),u.addEventListener("click",r),o.querySelector(".card__delete-button").addEventListener("click",t),o}function t(e){e.target.classList.toggle("card__like-button_is-active")}function n(e){e.target.closest(".places__item").remove()}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),e.addEventListener("mousedown",p)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),e.removeEventListener("mousedown",p)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}function p(e){e.target===e.currentTarget&&o(e.currentTarget)}var u=document.querySelector(".places__list");[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){var o=e({name:r.name,link:r.link},n,v,t);u.append(o)}));var a=document.querySelector(".popup_type_edit"),d=document.querySelector(".profile__edit-button"),i=document.querySelectorAll(".popup__close"),l=document.querySelector(".popup_type_new-card"),s=document.querySelector(".profile__add-button"),_=document.querySelector(".popup_type_image"),m=_.querySelector(".popup__image"),y=document.querySelector(".popup__caption");function v(e){m.src=e.link,m.alt=e.name,y.textContent=e.name,r(_)}d.addEventListener("click",(function(){f.value=q.textContent,k.value=S.textContent,r(a)})),i.forEach((function(e){e.addEventListener("click",(function(){o(e.closest(".popup"))}))})),s.addEventListener("click",(function(){r(l)}));var f=a.querySelector(".popup__input_type_name"),k=a.querySelector(".popup__input_type_description"),q=document.querySelector(".profile__title"),S=document.querySelector(".profile__description");a.querySelector(".popup__form").addEventListener("submit",(function(e){e.preventDefault(),q.textContent=f.value,S.textContent=k.value,o(a)}));var g=l.querySelector(".popup__form"),E=g.querySelector(".popup__input_type_card-name"),L=g.querySelector(".popup__input_type_url");g.addEventListener("submit",(function(r){r.preventDefault();var c=e({name:E.value,link:L.value},n,v,t);u.prepend(c),o(l),g.reset()}))})();