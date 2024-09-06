import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._confirmButton = this._popupElement.querySelector('.modal__button');
  }

  setSubmitFunction(submitFunction){
    this._handleConfirm = submitFunction
  }

  setEventListeners() {
    super.setEventListeners();''
    this._confirmButton.addEventListener('click', () =>{
      this._handleConfirm();
    })
    }
  }
