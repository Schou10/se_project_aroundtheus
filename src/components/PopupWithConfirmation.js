import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }

  setSubmitFunction(submitFunction){
    this._handleConfirm = submitFunction
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleConfirm;
    }
    
  }
