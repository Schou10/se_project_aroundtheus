import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._confirmButton = this._popupElement.querySelector('.modal__button');
    this._confirmButtonText = this._confirmButton.textContent;
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

    renderLoading(isLoading, loadingText="Deleting Card..") {
      if (isLoading) {
        this._confirmButton.textContent = loadingText;
      } else {
    // here we return back the initial text. So, you don’t need to bother yourself about it
        this._confirmButton.textContent = this._confirmButtonText;
      }
    }
  }
