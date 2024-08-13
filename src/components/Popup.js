export default class Popup{
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('modal_opened');
    document.addEventListener('keydown', _handleEscClose);
    this._popupElement.addEventListener('click', );
  }

  close() {
    this._popupElement.classList.remove('modal_opened');
    document.removeEventListener("keydown", _handleEscClose);
    this._popupElement.removeEventListener('click', );
  }

  _handleEscapeClose(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      this.close();
    }
  }

  setEventListeners() {
    this.closeButton = this._popupElement.querySelector('.modal__close');
    this.closeButton.addEventListener('click', close);
    this._popupElement.addEventListener('click', (event) => {
      if (event.target.classList.contains("modal_opened")) {
        this.close();
      }
    } )
  }
}