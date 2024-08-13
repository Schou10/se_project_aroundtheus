import Popup from "./Popup.js";

class PopupWithImage extends Popup{
  constructor(popupSelector, { name, link }) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector('modal__image');
    this._popupTitle = this._popupElement.querySelector('.modal__card-title');
    this._name = name;
    this._link = link
    
    

  }
  open(data){
   // set the image's src and alt
    this._popupImage.setAtribute('src', this._link);
    this._popupImage.setAtribute('alt', this._name);
   // set the caption's textContent
   this._popupTitle.textContent = this._name;
   super.open();
  }
}