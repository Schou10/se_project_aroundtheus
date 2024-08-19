import Popup from "./Popup.js";

export class PopupWithImage extends Popup{
  constructor(popupSelector, data) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.modal__image');
    this._popupTitle = this._popupElement.querySelector('.modal__card-title');
    
    

  }
  open(data){
   // set the image's src and alt
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
   // set the caption's textContent
    this._popupTitle.textContent = data.name;
    super.open();
  }
}