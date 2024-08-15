import Popup from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.modal__form')
    this._handleFormSubmit = handleFormSubmit;
  }
  close() {
    super.close();
    if (this._popupForm){
      this._popupForm.reset();
    }
  }
  setEventListeners() {
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent the default form submission
      this._handleFormSubmit(this._getInputValues()); // Call the passed submit handler
    });
    super.setEventListeners(); // Call the parent class's setEventListeners method
  }

  _getInputValues() {
    const inputList = this._popupForm.querySelectorAll('.modal__input');
    const formValues = {};
    inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
}
