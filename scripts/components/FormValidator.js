export default class FormValidator {
  constructor(settings, formElement){
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass 
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;

  }

  _hideInputError(){
    this._errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`)
  inputEl.classList.remove(this._inputErrorClass);
  this._errorMessageEl.classList.remove(this._errorClass);
  this._errorMessageEl.textContent = '';
  }

  _showInputError(inputEl){
    this._errorMessageEl = this.form.querySelector(`#${inputEl.id}-error`)
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }

  _toggleButtonState(){
    if(hasInvalidInput(this._inputEls)){
      disableButton(this._submitButton, this._inactiveButtonClass);
      return;
    }
    enableButton(this._submitButton, this._inactiveButtonClass);
  }
  
  _hasInvalidInput(){
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _enableButton(){
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _disableButton(){
    this._submitButton.classList.add(this._inactiveButtonClass);
  this._submitButton.disabled = true;
  }

  _checkInputValidity(inputEl){
    if(!inputEl.validity.valid){
      return showInputError(inputEl);
    }
    hideInputError(inputEl);
  }

  _setEventListener(){
    this._inputSelector = options;
    this._inputEls = [this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl)=>{
      inputEl.addEventListener('input', (e) =>{
        _checkInputValidity(inputEl);
        _toggleButtonState();
    });

  });
}

  enableValidation(){
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    _setEventListeners(formEl, options);
  };
}
