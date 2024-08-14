export default class Popup{
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('modal_opened');
    document.addEventListener('keydown', (event) => {this._handleEscapeClose(event)});
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove('modal_opened');
    document.removeEventListener("keydown", (event) => {this._handleEscapeClose(event)});
  }

  _handleEscapeClose(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._popupElement.querySelector('.modal__close');
    this._closeButton.addEventListener('click', () => {this.close();});
    this._popupElement.addEventListener('click', (event) => {
      if (event.target.classList.contains("modal_opened")) {
        this.close();
      }
    } )
  }
}