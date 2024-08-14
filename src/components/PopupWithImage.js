import Popup from "./Popup.js";

export class PopupWithImage extends Popup{
  constructor(popupSelector, data) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.modal__image');
    this._popupTitle = this._popupElement.querySelector('.modal__card-title');
    this._name = data.name;
    this._link = data.link
    
    

  }
  open(data){
   // set the image's src and alt
    this._popupImage.src = data._link;
    this._popupImage.alt = data._name;
   // set the caption's textContent
    this._popupTitle.textContent = data._name;
    super.open();
  }
}