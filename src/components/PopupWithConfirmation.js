import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector, handleConfirm){
    super(popupSelector);
    this._confimButton = this._popupElement.querySelector('.modal__button')
    this._handleConfirm = handleConfirm;
  }
  setEventListeners() {
    super.setEventListeners();
    this._confimButton.addEventListener('click', this._handleConfirm)
  }
}