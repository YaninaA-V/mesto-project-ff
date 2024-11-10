export function openModalWindow(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener('keydown', closeEscModal);
  popup.addEventListener('mousedown', clickOverlay);
  setTimeout(() => {
    popup.style.display = 'flex';
}, 30);
  }   

export function closeModalWindow(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closeEscModal);
  popup.removeEventListener('mousedown', clickOverlay);
  setTimeout(() => {
    popup.style.display = 'none';
}, 100);  
  }   
  
function closeEscModal(evt) {
  if(evt.key === "Escape") {
    const popup = document.querySelector('.popup_is-opened');
    closeModalWindow(popup);  
}
}
function clickOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    closeModalWindow(evt.currentTarget);
  }
}
