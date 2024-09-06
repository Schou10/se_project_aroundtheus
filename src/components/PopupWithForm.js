import Popup from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.modal__form')
    this._handleFormSubmit = handleFormSubmit;
    this.inputList = this._popupForm.querySelectorAll('.modal__input');
    this.submitButton = this._popupForm.querySelector('.modal__button');
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
        this._handleFormSubmit(inputValues);
    });
  }

  _getInputValues() {
    const formValues = {};
    this.inputList.forEach(input => {
      formValues[input.name] = input.value.trim();
    });
    return formValues;
  }
  setInputValues(data) {
    console.log(data);
    this.inputList.forEach((input) => {
      // Here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }
}