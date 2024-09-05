export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteSubmit, handleCardLike) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    console.log(`_isLiked: ${this._isLiked}`);
    this._userId = data.owner;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteSubmit = handleDeleteSubmit;
    this._handleCardLike = handleCardLike;
    this._element = this._getTemplate();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike(this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteSubmit(this);
    });

    this._cardImageElement.addEventListener('click', () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  isLiked(){
    return this._isLiked;
  }

  updateLikes(updatedLike) { 
    this._isLiked = updatedLike; //updates isLiked Boolean
    this.toggleLikeIcon();
  }

  toggleLikeIcon() {
    this._likeButton.classList.toggle('card__like-button-active', this._isLiked);
    
  }

  getId() {
    return this._id;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button")
    this._cardImageElement = this._cardElement.querySelector('.card__image');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button')
    this._cardImageElement.setAttribute('src', this._link);
    this._cardImageElement.setAttribute('alt', this._name);
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this.toggleLikeIcon(); //Shows the user if it already liked
    this._setEventListeners();

    return this._cardElement;
  }
}