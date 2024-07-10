// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, options, inputEl){
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`)
  console.log(errorMessageEl);
}

function checkInputValidity(formEl, options, inputEl) {
  if(!inputEl.validity.valid){
    showInputError(formEl, options, inputEl);
  } else{
    hideInputError(formEl, options, inputEl);
  }

}

function setEventListeners(formEl, options){
  const {inputSelector} = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl)=>{
    inputEl.addEventListener('input', (e) =>{
      checkInputValidity(formEl, options, inputEl);
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
  });
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}

enableValidation(config);