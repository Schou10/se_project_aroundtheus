export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteSubmit, handleCardLike) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._isLiked = this._likes.some(like => like._id === this._userId);
    this._userId = data.owner;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteSubmit = handleDeleteSubmit;
    this._handleCardLike = handleCardLike;
    this._element = this._getTemplate();
    console.log(`_isLiked:${this._isLiked}, _userId: ${this._userId}`);
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
    return this._isliked;
  }

  updateLikes(userId, updatedLike) {
    const newLike = {_id: userId, isLiked: updatedLike}; 
    console.log("Likes list: ", this._likes, "New Like: ", updatedLike);
    console.log(`_like.some(like => like == newLike): ${this._likes.some(like => like == newLike)}`);
    if(!this._likes.some(like => like == newLike)) {
      console.log("Like Added");
      this._likes.push(newLike); //Adds like to list
    }
    else {
      console.log("Like Removed")
      this._likes.pop(newLike); //Removes like from list
    }
    console.log(`_like.some(like => like == newLike): ${this._likes.some(like => like == newLike)}`);
    this._isLiked = this._likes.some(like => like._id === this._userId);  // Update the isLiked boolean
    console.log(this._isLiked);
    this._element.querySelector('.card__like-count').textContent = this._likes.length;
  }

  toggleLikeIcon() {
    console.log("This like button is",this._isLiked);
    this._likeButton.classList.toggle('card__like-button-active', this._isLiked);
    console.log("Like button toggled", this._isLiked);
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

    this._setEventListeners();

    return this._cardElement;
  }
}