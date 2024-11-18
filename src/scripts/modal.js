export function openModalWindow(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseByEsc);
  popup.addEventListener("mousedown", handleCloseByOverlayClick);
}

export function closeModalWindow(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseByEsc);
  popup.removeEventListener("mousedown", handleCloseByOverlayClick);
}

function handleCloseByEsc(evt) {
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
