!function(){"use strict";class t{constructor(t,e,s){this._name=t.name,this._link=t.link,this._cardSelector=e,this._handleImageClick=s}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}_setEventListeners(){this._likeButton.addEventListener("click",(()=>{this._handleLikeIcon()})),this._trashButton.addEventListener("click",(()=>{this._handleDeleteCard()})),this._cardImageElement.addEventListener("click",(()=>{this._handleImageClick({name:this._name,link:this._link})}))}_handleLikeIcon(){this._likeButton.classList.toggle("card__like-button-active")}_handleDeleteCard(){this._cardElement.remove(),this._cardElement=null}getView(){return this._cardElement=this._getTemplate(),this._likeButton=this._cardElement.querySelector(".card__like-button"),this._cardImageElement=this._cardElement.querySelector(".card__image"),this._trashButton=this._cardElement.querySelector(".card__delete-button"),this._cardImageElement.setAttribute("src",this._link),this._cardImageElement.setAttribute("alt",this._name),this._cardElement.querySelector(".card__title").textContent=this._name,this._setEventListeners(),this._cardElement}}class e{constructor(t,e){this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._form=e,this._inputEls=[...this._form.querySelectorAll(this._inputSelector)],this._submitButton=this._form.querySelector(this._submitButtonSelector)}_hideInputError(t){const e=this._form.querySelector(`#${t.id}-error`);t.classList.remove(this._inputErrorClass),e.classList.remove(this._errorClass),e.textContent=""}_showInputError(t){const e=this._form.querySelector(`#${t.id}-error`);t.classList.add(this._inputErrorClass),e.textContent=t.validationMessage,e.classList.add(this._errorClass)}_hasInvalidInput(){return this._inputEls.some((t=>!t.validity.valid))}_toggleButtonState(){this._hasInvalidInput()?this.disableButton():this._enableButton()}_enableButton(){this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.disabled=!1}disableButton(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0}_checkInputValidity(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}_setEventListeners(){this._toggleButtonState(),this._inputEls.forEach((t=>{t.addEventListener("input",(()=>{this._checkInputValidity(t),this._toggleButtonState()}))})),this._form.addEventListener("reset",(()=>{setTimeout((()=>{this._toggleButtonState()}),0)}))}enableValidation(){this._form.addEventListener("submit",(t=>{t.preventDefault()})),this._setEventListeners()}}const s=[{name:"Yosemite Valley",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"},{name:"Lake Louisey",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"},{name:"Bald Mountains",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"},{name:"Latemar",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"},{name:"Vanoise National Park",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"},{name:"Lago di Braies",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"}],n={inputSelector:".modal__input",submitButtonSelector:".modal__button",inactiveButtonClass:"modal__button_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error_visible"};class i{constructor(t){this._popupElement=document.querySelector(t)}open(){this._popupElement.classList.add("modal_opened"),document.addEventListener("keydown",this._handleEscapeClose)}close(){this._popupElement.classList.remove("modal_opened"),document.removeEventListener("keydown",this._handleEscapeClose)}_handleEscapeClose=t=>{"Escape"!==t.key&&"Esc"!==t.key||this.close()};setEventListeners(){this._closeButton=this._popupElement.querySelector(".modal__close"),this._closeButton.addEventListener("click",(()=>{this.close()})),this._popupElement.addEventListener("click",(t=>{t.target.classList.contains("modal_opened")&&this.close()}))}}class o extends i{constructor(t,e){super(t),this._popupForm=this._popupElement.querySelector(".modal__form"),this._handleFormSubmit=e,this.inputList=this._popupForm.querySelectorAll(".modal__input")}setEventListeners(){super.setEventListeners(),this._popupForm.addEventListener("submit",(t=>{t.preventDefault();const e=this._getInputValues();this._handleFormSubmit(e),this._popupForm.reset()}))}_getInputValues(){const t={};return this.inputList.forEach((e=>{t[e.name]=e.value.trim()})),t}setInputValues(t){console.log(t),this.inputList.forEach((e=>{e.value=t[e.name]}))}}const r=new class{constructor(t,e){let{data:s,renderer:n}=t;this._data=s,this._renderer=n,this._container=document.querySelector(e)}renderItems(){this._data.forEach((t=>{this._renderer(t)}))}addItems(t){this._container.prepend(t)}}({data:s,renderer:t=>{const e=b(t);r.addItems(e)}},".galary__cards");r.renderItems(s);const a=new o("#profile-edit-modal",(function(t){h.setUserInfo({name:t.name,job:t.description}),a.close()})),l=new o("#add-card-modal",(function(t){const e=b({name:t.title,link:t.url});r.addItems(e),l.close(),E.reset(),g.disableButton()})),c=new class extends i{constructor(t,e){super(t),this._popupImage=this._popupElement.querySelector(".modal__image"),this._popupTitle=this._popupElement.querySelector(".modal__card-title")}open(t){this._popupImage.src=t.link,this._popupImage.alt=t.name,this._popupTitle.textContent=t.name,super.open()}}("#image-modal",L),u=document.querySelector("#profile-edit-button"),d=document.querySelector("#profile-add-button"),m=document.querySelector("#name-input"),_=document.querySelector("#description-input"),h=new class{constructor(t,e){this._nameElement=document.querySelector(t),this._jobElement=document.querySelector(e)}getUserInfo(){return{name:this._nameElement.textContent,job:this._jobElement.textContent}}setUserInfo(t){this._nameElement.textContent=t.name,this._jobElement.textContent=t.job}}("#name","#description"),p=document.forms["profile-edit-form"],E=document.forms["add-card-form"],v=new e(n,p),g=new e(n,E);function b(e){return new t(e,"#card-template",L).getView()}function L(t){c.open(t)}v.enableValidation(),g.enableValidation(),u.addEventListener("click",(function(){const t=h.getUserInfo();m.value=t.name,_.value=t.job,a.open()})),d.addEventListener("click",(()=>{l.open()})),a.setEventListeners(),l.setEventListeners(),c.setEventListeners()}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxFQUFZdkksS0FDbEM4SCxFQUFhdEMsTUFBUStDLEVBQVl4QixJQUNqQ0gsRUFBVXpDLE1BQ1osSUFLQXlELEVBQWlCaEgsaUJBQWlCLFNBQVMsS0FDekNxRyxFQUFhOUMsTUFBTSxJQUdyQnlDLEVBQVVuQyxvQkFDVndDLEVBQWF4QyxvQkFDYjZDLEVBQVc3QyxtQiIsInNvdXJjZXMiOlsid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL2NhcmQuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSwgY2FyZFNlbGVjdG9yLCBoYW5kbGVJbWFnZUNsaWNrKSB7XHJcbiAgICB0aGlzLl9uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5fbGluayA9IGRhdGEubGluaztcclxuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcclxuICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2sgPSBoYW5kbGVJbWFnZUNsaWNrO1xyXG4gIH1cclxuXHJcbiAgX2dldFRlbXBsYXRlKCkge1xyXG4gICAgY29uc3QgY2FyZEVsZW1lbnQgPSBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXHJcbiAgICAgIC5jb250ZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcuY2FyZCcpXHJcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgcmV0dXJuIGNhcmRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5faGFuZGxlTGlrZUljb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX3RyYXNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVEZWxldGVDYXJkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9jYXJkSW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrKHtcclxuICAgICAgICBuYW1lOiB0aGlzLl9uYW1lLFxyXG4gICAgICAgIGxpbms6IHRoaXMuX2xpbmssXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlTGlrZUljb24oKSB7XHJcbiAgICB0aGlzLl9saWtlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2NhcmRfX2xpa2UtYnV0dG9uLWFjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZURlbGV0ZUNhcmQoKSB7XHJcbiAgICB0aGlzLl9jYXJkRWxlbWVudC5yZW1vdmUoKTtcclxuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldFZpZXcoKSB7XHJcbiAgICB0aGlzLl9jYXJkRWxlbWVudCA9IHRoaXMuX2dldFRlbXBsYXRlKCk7XHJcbiAgICB0aGlzLl9saWtlQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19saWtlLWJ1dHRvblwiKVxyXG4gICAgdGhpcy5fY2FyZEltYWdlRWxlbWVudCA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX19pbWFnZScpO1xyXG4gICAgdGhpcy5fdHJhc2hCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fZGVsZXRlLWJ1dHRvbicpXHJcblxyXG4gICAgdGhpcy5fY2FyZEltYWdlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRoaXMuX2xpbmspO1xyXG4gICAgdGhpcy5fY2FyZEltYWdlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHRoaXMuX25hbWUpO1xyXG4gICAgdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRfX3RpdGxlJykudGV4dENvbnRlbnQgPSB0aGlzLl9uYW1lO1xyXG5cclxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2NhcmRFbGVtZW50O1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1WYWxpZGF0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzLCBmb3JtRWxlbWVudCkge1xyXG4gICAgdGhpcy5faW5wdXRTZWxlY3RvciA9IHNldHRpbmdzLmlucHV0U2VsZWN0b3I7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3RvciA9IHNldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yO1xyXG4gICAgdGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyA9IHNldHRpbmdzLmluYWN0aXZlQnV0dG9uQ2xhc3M7XHJcbiAgICB0aGlzLl9pbnB1dEVycm9yQ2xhc3MgPSBzZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3M7XHJcbiAgICB0aGlzLl9lcnJvckNsYXNzID0gc2V0dGluZ3MuZXJyb3JDbGFzcztcclxuICAgIHRoaXMuX2Zvcm0gPSBmb3JtRWxlbWVudDtcclxuICAgIHRoaXMuX2lucHV0RWxzID0gWy4uLnRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKV07XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IodGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZUVsID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsLmlkfS1lcnJvcmApO1xyXG4gICAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XHJcbiAgICBlcnJvck1lc3NhZ2VFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gICAgZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSAnJztcclxuICB9XHJcblxyXG4gIF9zaG93SW5wdXRFcnJvcihpbnB1dEVsKSB7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VFbCA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcihgIyR7aW5wdXRFbC5pZH0tZXJyb3JgKTtcclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgZXJyb3JNZXNzYWdlRWwudGV4dENvbnRlbnQgPSBpbnB1dEVsLnZhbGlkYXRpb25NZXNzYWdlO1xyXG4gICAgZXJyb3JNZXNzYWdlRWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcclxuICB9XHJcblxyXG4gIF9oYXNJbnZhbGlkSW5wdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW5wdXRFbHMuc29tZSgoaW5wdXRFbCkgPT4gIWlucHV0RWwudmFsaWRpdHkudmFsaWQpO1xyXG4gIH1cclxuXHJcbiAgX3RvZ2dsZUJ1dHRvblN0YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dCgpKSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZW5hYmxlQnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfZW5hYmxlQnV0dG9uKCkge1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGRpc2FibGVCdXR0b24oKSB7XHJcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWwpIHtcclxuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xyXG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0RWwpID0+IHtcclxuICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbCk7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCAoKSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5fZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcclxuICB7XHJcbiAgICBuYW1lOiBcIllvc2VtaXRlIFZhbGxleVwiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L3lvc2VtaXRlLmpwZ1wiIFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWtlIExvdWlzZXlcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9sYWtlLWxvdWlzZS5qcGdcIiBcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiQmFsZCBNb3VudGFpbnNcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9iYWxkLW1vdW50YWlucy5qcGdcIiBcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGF0ZW1hclwiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2xhdGVtYXIuanBnXCIgXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIlZhbm9pc2UgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L3Zhbm9pc2UuanBnXCIgXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxhZ28gZGkgQnJhaWVzXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGFnby5qcGdcIiBcclxuICB9XHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgdmFsaWRhdGlvblNldHRpbmdzID0ge1xyXG4gIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxyXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiBcIi5tb2RhbF9fYnV0dG9uXCIsXHJcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fYnV0dG9uX2Rpc2FibGVkXCIsXHJcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXHJcbiAgZXJyb3JDbGFzczogXCJtb2RhbF9fZXJyb3JfdmlzaWJsZVwiXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgb3BlbigpIHtcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtb2RhbF9vcGVuZWQnKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVFc2NhcGVDbG9zZSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbF9vcGVuZWQnKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY2FwZUNsb3NlKTtcclxuICB9XHJcblxyXG4gIF9oYW5kbGVFc2NhcGVDbG9zZSA9IChldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIiB8fCBldmVudC5rZXkgPT09IFwiRXNjXCIpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbiA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2Nsb3NlJyk7XHJcbiAgICB0aGlzLl9jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHt0aGlzLmNsb3NlKCk7fSk7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9vcGVuZWRcIikpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gKVxyXG4gIH1cclxufSIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX3BvcHVwRm9ybSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2Zvcm0nKVxyXG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XHJcbiAgICB0aGlzLmlucHV0TGlzdCA9IHRoaXMuX3BvcHVwRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWxfX2lucHV0Jyk7XHJcbiAgfVxyXG5cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKClcclxuICAgIHRoaXMuX3BvcHVwRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IGlucHV0VmFsdWVzID0gdGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVGb3JtU3VibWl0KGlucHV0VmFsdWVzKTtcclxuICAgICAgICB0aGlzLl9wb3B1cEZvcm0ucmVzZXQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgZm9ybVZhbHVlcyA9IHt9O1xyXG4gICAgdGhpcy5pbnB1dExpc3QuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICAgIGZvcm1WYWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZS50cmltKCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmb3JtVmFsdWVzO1xyXG4gIH1cclxuICBzZXRJbnB1dFZhbHVlcyhkYXRhKSB7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIHRoaXMuaW5wdXRMaXN0LmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIC8vIEhlcmUgeW91IGluc2VydCB0aGUgYHZhbHVlYCBieSB0aGUgYG5hbWVgIG9mIHRoZSBpbnB1dFxyXG4gICAgICBpbnB1dC52YWx1ZSA9IGRhdGFbaW5wdXQubmFtZV07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL2NhcmQuanNcIjtcclxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xyXG5pbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XHJcbmltcG9ydCBVc2VySW5mbyAgZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcclxuaW1wb3J0IHsgaW5pdGlhbENhcmRzLCB2YWxpZGF0aW9uU2V0dGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzLmpzXCI7XHJcbmltcG9ydCB7IFBvcHVwV2l0aEZvcm0gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XHJcbmltcG9ydCB7IFBvcHVwV2l0aEltYWdlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcclxuaW1wb3J0IFwiLi4vcGFnZXMvaW5kZXguY3NzXCI7XHJcblxyXG4vLyBSZW5kZXIgaW5pdGlhbCBjYXJkcyBpbiB1c2luZyBTZWN0aW9uIENsYXNzXHJcbmNvbnN0IHNlY3Rpb24gPSBuZXcgU2VjdGlvbih7XHJcbiAgZGF0YTogaW5pdGlhbENhcmRzLFxyXG4gIHJlbmRlcmVyOiAoY2FyZERhdGEpID0+IHtcclxuICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gY3JlYXRlQ2FyZChjYXJkRGF0YSk7XHJcbiAgICBzZWN0aW9uLmFkZEl0ZW1zKGNhcmRFbGVtZW50KTtcclxuICB9XHJcbn0sICcuZ2FsYXJ5X19jYXJkcycpO1xyXG5zZWN0aW9uLnJlbmRlckl0ZW1zKGluaXRpYWxDYXJkcyk7XHJcblxyXG5cclxuLyogRWxlbWVudHMgKi8gXHJcblxyXG4vL3BvcHVwc1xyXG5jb25zdCBlZGl0UG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybSgnI3Byb2ZpbGUtZWRpdC1tb2RhbCcsIGhhbmRsZVByb2ZpbGVTdWJtaXQpO1xyXG5jb25zdCBhZGRjYXJkUG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybSgnI2FkZC1jYXJkLW1vZGFsJywgaGFuZGxlQWRkQ2FyZFN1Ym1pdCk7XHJcbmNvbnN0IGltYWdlUG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoJyNpbWFnZS1tb2RhbCcsIGhhbmRsZUltYWdlQ2xpY2spOyBcclxuXHJcbi8vYnV0dG9uXHJcbmNvbnN0IHByb2ZpbGVFZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2ZpbGUtZWRpdC1idXR0b24nKTtcclxuY29uc3QgYWRkTmV3Q2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1hZGQtYnV0dG9uXCIpO1xyXG5cclxuLy9wcm9maWxlIG5hbWUgJiBkZXNjcmlwdGlvbiAvIHVzZXIgaW5mb1xyXG5jb25zdCB1c2VyTmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lLWlucHV0XCIpO1xyXG5jb25zdCB1c2VySm9iSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uLWlucHV0XCIpO1xyXG5cclxuY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oXCIjbmFtZVwiLCBcIiNkZXNjcmlwdGlvblwiKVxyXG5cclxuLy9mb3Jtc1xyXG5jb25zdCBwcm9maWxlRWRpdEZvcm1FbGVtZW50ID0gZG9jdW1lbnQuZm9ybXNbXCJwcm9maWxlLWVkaXQtZm9ybVwiXTtcclxuY29uc3QgcHJvZmlsZUFkZEZvcm1FbGVtZW50ID0gZG9jdW1lbnQuZm9ybXNbXCJhZGQtY2FyZC1mb3JtXCJdO1xyXG5cclxuLy92YWxpZGF0b3JzXHJcbmNvbnN0IGVkaXRGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IodmFsaWRhdGlvblNldHRpbmdzLCBwcm9maWxlRWRpdEZvcm1FbGVtZW50KTtcclxuY29uc3QgYWRkRm9ybVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHZhbGlkYXRpb25TZXR0aW5ncywgcHJvZmlsZUFkZEZvcm1FbGVtZW50KTtcclxuXHJcblxyXG4vKiBGdW5jdGlvbnMqL1xyXG4vL0Zvcm0gVmFsaWRhdG9yc1xyXG5lZGl0Rm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XHJcbmFkZEZvcm1WYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xyXG5cclxuLy9DcmVhdGUgQ2FyZFxyXG5mdW5jdGlvbiBjcmVhdGVDYXJkKGl0ZW0pIHtcclxuICBjb25zdCBjYXJkRWxlbWVudCA9IG5ldyBDYXJkKGl0ZW0sICcjY2FyZC10ZW1wbGF0ZScsIGhhbmRsZUltYWdlQ2xpY2spO1xyXG5yZXR1cm4gY2FyZEVsZW1lbnQuZ2V0VmlldygpXHJcbn1cclxuLypFdmVudCBIYW5kbGVycyovXHJcbi8vaW1hZ2UgY2xpY2tcclxuZnVuY3Rpb24gaGFuZGxlSW1hZ2VDbGljayhjYXJkRGF0YSkge1xyXG4gICAgaW1hZ2VQb3B1cC5vcGVuKGNhcmREYXRhKTtcclxufVxyXG5cclxuLy9lZGl0IHByb2ZpbGVcclxuZnVuY3Rpb24gaGFuZGxlUHJvZmlsZVN1Ym1pdChkYXRhKSB7XHJcbiAgdXNlckluZm8uc2V0VXNlckluZm8oe25hbWU6IGRhdGEubmFtZSwgam9iOiBkYXRhLmRlc2NyaXB0aW9ufSk7XHJcbmVkaXRQb3B1cC5jbG9zZSgpOyB9XHJcblxyXG4vL2FkZCBjYXJkXHJcbmZ1bmN0aW9uIGhhbmRsZUFkZENhcmRTdWJtaXQoZGF0YSkge1xyXG4gIGNvbnN0IGNhcmQgPSB7XHJcbiAgICBuYW1lOiBkYXRhLnRpdGxlLFxyXG4gICAgbGluazogZGF0YS51cmxcclxuICB9O1xyXG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gY3JlYXRlQ2FyZChjYXJkKTtcclxuICBzZWN0aW9uLmFkZEl0ZW1zKGNhcmRFbGVtZW50KTtcclxuICBhZGRjYXJkUG9wdXAuY2xvc2UoKTtcclxuICBwcm9maWxlQWRkRm9ybUVsZW1lbnQucmVzZXQoKTtcclxuICBhZGRGb3JtVmFsaWRhdG9yLmRpc2FibGVCdXR0b24oKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlbkVkaXRQcm9maWxlTW9kYWwoKSB7XHJcbiAgY29uc3QgY3VycmVudFVzZXIgPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xyXG4gIHVzZXJOYW1lSW5wdXQudmFsdWUgPSBjdXJyZW50VXNlci5uYW1lO1xyXG4gIHVzZXJKb2JJbnB1dC52YWx1ZSA9IGN1cnJlbnRVc2VyLmpvYjtcclxuICBlZGl0UG9wdXAub3BlbigpO1xyXG59XHJcblxyXG4vLyBFdmVudCBMaXN0ZW5lcnNcclxucHJvZmlsZUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuRWRpdFByb2ZpbGVNb2RhbCk7XHJcblxyXG5hZGROZXdDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGFkZGNhcmRQb3B1cC5vcGVuKCk7XHJcbn0pO1xyXG5cclxuZWRpdFBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbmFkZGNhcmRQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5pbWFnZVBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHtkYXRhLCByZW5kZXJlcn0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XHJcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcclxuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XHJcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckl0ZW1zKCkge1xyXG4gICAgdGhpcy5fZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlcihpdGVtKTtcclxuICB9KTtcclxufVxyXG5cclxuICBhZGRJdGVtcyhlbGVtZW50KSB7XHJcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcclxuICB9XHJcbn0iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwe1xyXG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGRhdGEpIHtcclxuICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5fcG9wdXBJbWFnZSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfX2ltYWdlJyk7XHJcbiAgICB0aGlzLl9wb3B1cFRpdGxlID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2FyZC10aXRsZScpO1xyXG4gICAgXHJcbiAgICBcclxuXHJcbiAgfVxyXG4gIG9wZW4oZGF0YSl7XHJcbiAgIC8vIHNldCB0aGUgaW1hZ2UncyBzcmMgYW5kIGFsdFxyXG4gICAgdGhpcy5fcG9wdXBJbWFnZS5zcmMgPSBkYXRhLmxpbms7XHJcbiAgICB0aGlzLl9wb3B1cEltYWdlLmFsdCA9IGRhdGEubmFtZTtcclxuICAgLy8gc2V0IHRoZSBjYXB0aW9uJ3MgdGV4dENvbnRlbnRcclxuICAgIHRoaXMuX3BvcHVwVGl0bGUudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XHJcbiAgICBzdXBlci5vcGVuKCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm97XHJcbiAgY29uc3RydWN0b3IobmFtZVNlbGN0b3IsIGpvYlNlbGVjdG9yKXtcclxuICAgIHRoaXMuX25hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lU2VsY3Rvcik7XHJcbiAgICB0aGlzLl9qb2JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihqb2JTZWxlY3Rvcik7XHJcbiAgICBcclxuICB9XHJcbiAgZ2V0VXNlckluZm8oKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IHRoaXMuX25hbWVFbGVtZW50LnRleHRDb250ZW50LCBcclxuICAgICAgam9iOiB0aGlzLl9qb2JFbGVtZW50LnRleHRDb250ZW50fTsgICAgXHJcbiAgfVxyXG4gIHNldFVzZXJJbmZvKGRhdGEpe1xyXG4gICAgdGhpcy5fbmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLl9qb2JFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5qb2IgO1xyXG59XHJcbiAgfVxyXG4iXSwibmFtZXMiOlsiQ2FyZCIsImNvbnN0cnVjdG9yIiwiZGF0YSIsImNhcmRTZWxlY3RvciIsImhhbmRsZUltYWdlQ2xpY2siLCJ0aGlzIiwiX25hbWUiLCJuYW1lIiwiX2xpbmsiLCJsaW5rIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVJbWFnZUNsaWNrIiwiX2dldFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImNsb25lTm9kZSIsIl9zZXRFdmVudExpc3RlbmVycyIsIl9saWtlQnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9oYW5kbGVMaWtlSWNvbiIsIl90cmFzaEJ1dHRvbiIsIl9oYW5kbGVEZWxldGVDYXJkIiwiX2NhcmRJbWFnZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJfY2FyZEVsZW1lbnQiLCJyZW1vdmUiLCJnZXRWaWV3Iiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWxlbWVudCIsIl9pbnB1dFNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsIl9zdWJtaXRCdXR0b25TZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiX2luYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiX2lucHV0RXJyb3JDbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsIl9lcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsIl9mb3JtIiwiX2lucHV0RWxzIiwicXVlcnlTZWxlY3RvckFsbCIsIl9zdWJtaXRCdXR0b24iLCJfaGlkZUlucHV0RXJyb3IiLCJpbnB1dEVsIiwiZXJyb3JNZXNzYWdlRWwiLCJpZCIsIl9zaG93SW5wdXRFcnJvciIsImFkZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hhc0ludmFsaWRJbnB1dCIsInNvbWUiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiZGlzYWJsZUJ1dHRvbiIsIl9lbmFibGVCdXR0b24iLCJkaXNhYmxlZCIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJmb3JFYWNoIiwic2V0VGltZW91dCIsImVuYWJsZVZhbGlkYXRpb24iLCJlIiwicHJldmVudERlZmF1bHQiLCJpbml0aWFsQ2FyZHMiLCJ2YWxpZGF0aW9uU2V0dGluZ3MiLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXBFbGVtZW50Iiwib3BlbiIsIl9oYW5kbGVFc2NhcGVDbG9zZSIsImNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwia2V5Iiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJfY2xvc2VCdXR0b24iLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVGb3JtU3VibWl0Iiwic3VwZXIiLCJfcG9wdXBGb3JtIiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJpbnB1dExpc3QiLCJpbnB1dFZhbHVlcyIsIl9nZXRJbnB1dFZhbHVlcyIsInJlc2V0IiwiZm9ybVZhbHVlcyIsImlucHV0IiwidmFsdWUiLCJ0cmltIiwic2V0SW5wdXRWYWx1ZXMiLCJjb25zb2xlIiwibG9nIiwic2VjdGlvbiIsIl9yZWYiLCJjb250YWluZXJTZWxlY3RvciIsInJlbmRlcmVyIiwiX2RhdGEiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwicmVuZGVySXRlbXMiLCJpdGVtIiwiYWRkSXRlbXMiLCJlbGVtZW50IiwicHJlcGVuZCIsImNhcmREYXRhIiwiY2FyZEVsZW1lbnQiLCJjcmVhdGVDYXJkIiwiZWRpdFBvcHVwIiwidXNlckluZm8iLCJzZXRVc2VySW5mbyIsImpvYiIsImRlc2NyaXB0aW9uIiwiYWRkY2FyZFBvcHVwIiwidGl0bGUiLCJ1cmwiLCJwcm9maWxlQWRkRm9ybUVsZW1lbnQiLCJhZGRGb3JtVmFsaWRhdG9yIiwiaW1hZ2VQb3B1cCIsIl9wb3B1cEltYWdlIiwiX3BvcHVwVGl0bGUiLCJzcmMiLCJhbHQiLCJwcm9maWxlRWRpdEJ1dHRvbiIsImFkZE5ld0NhcmRCdXR0b24iLCJ1c2VyTmFtZUlucHV0IiwidXNlckpvYklucHV0IiwibmFtZVNlbGN0b3IiLCJqb2JTZWxlY3RvciIsIl9uYW1lRWxlbWVudCIsIl9qb2JFbGVtZW50IiwiZ2V0VXNlckluZm8iLCJwcm9maWxlRWRpdEZvcm1FbGVtZW50IiwiZm9ybXMiLCJlZGl0Rm9ybVZhbGlkYXRvciIsImN1cnJlbnRVc2VyIl0sInNvdXJjZVJvb3QiOiIifQ==