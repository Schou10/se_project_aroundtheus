// enabling validation by calling enableValidation()
// pass all the settings on call

function hasInvalidInput(inputList){
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disableButton(submitButton, inactiveButtonClass){
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, inactiveButtonClass){
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}){
  if(hasInvalidInput(inputEls)){
    disableButton(submitButton, inactiveButtonClass);
    return;
  }
  enableButton(submitButton, inactiveButtonClass);
}


function hideInputError(formEl, {inputErrorClass, errorClass}, inputEl){
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`)
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.classList.remove(errorClass);
  errorMessageEl.textContent = '';
  

}

function showInputError(formEl, {inputErrorClass, errorClass}, inputEl){
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`)
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function checkInputValidity(formEl, options, inputEl) {
  if(!inputEl.validity.valid){
    return showInputError(formEl, options, inputEl);
  }
  hideInputError(formEl, options, inputEl);
}

function setEventListeners(formEl, options){
  const {inputSelector} = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  inputEls.forEach((inputEl)=>{
    inputEl.addEventListener('input', (e) =>{
      checkInputValidity(formEl, options, inputEl);
      toggleButtonState(inputEls, submitButton, options);
    });

  });
}

function enableValidation(options){
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl)=>{
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
    const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
    const submitButton = formEl.querySelector(options.submitButtonSelector);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

enableValidation(config);