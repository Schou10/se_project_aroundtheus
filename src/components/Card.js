export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteSubmit, handleCardLike) {
    this._data = data;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteSubmit = handleDeleteSubmit;
    this._handleCardLike = handleCardLike;
    this._element = this._getTemplate;
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
      this._handleCardLike(this._data._id, this._element);
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
    return this._likes.some(like => like._id === this._userId);
  }

  updateLikes(newLikes) {
    this._likes = newLikes;
    this._element.querySelector('.card__like-count').textContent = this._likes.length;
    if (this.isLiked()) {
      this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
    } else {
      this._element.querySelector('.card__like-button').classList.remove('card__like-button_active');
    }
  }

  toggleLikeIcon() {
    this._likeButton.classList.toggle('card__like-button-active');
  }

  getId() {
    return this._data._id;
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