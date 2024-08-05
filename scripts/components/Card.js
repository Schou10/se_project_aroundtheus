export default class Card {
  constructor(data, cardSelector, handleImageClick){
    this._name = data.name; 
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  };

  _setEventListeners() {
    console.log(this._cardElement);
    //Like Button".card__like-button"
    this._cardElement.querySelector(".card__like-button").addEventListener('click', ()=>{
      this._handleLikeIcon();
    })
    
    //Delete Button".card__delete-button"
    this._cardElement.querySelector(".card__delete-button").addEventListener('click', ()=>{
      this._handleDeleteCard();
    })
    //Click Card
    this._cardImageElement.addEventListener('click', () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeIcon() {
    this._cardElement.querySelector(".card__like-button").classList.toggle("card__like-button-active")
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    //get the card view
    this._cardElement.querySelector(".card__image").setAtribute("src", this._link);
    this._cardElement.querySelector(".card__image").setAtribute("alt", this._name);
    this._cardElement.querySelector(".card__title").textContent = this._name;

    //set event listeners
    this._setEventListeners();
    
    //return card
    return Card;
}}