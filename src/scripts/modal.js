export function openModalWindow(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscModal);
  popup.addEventListener("mousedown", handleCloseByOverlayClick);
}

export function closeModalWindow(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscModal);
  popup.removeEventListener("mousedown", handleCloseByOverlayClick);
  popup.addEventListener("transitionend", function handleTransitionEnd() {
    popup.classList.remove(".popup_is-opened");
    popup.style.display = "";
    popup.removeEventListener("transitionend", handleTransitionEnd);
  });
}

function closeEscModal(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModalWindow(popup);
  }
}
function handleCloseByOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModalWindow(evt.currentTarget);
  }
}
