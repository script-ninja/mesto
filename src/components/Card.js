export default class Card {
  constructor(
    { _id, name, link, owner, likes },
    userID,
    templateSelector,
    handleCardClick, handleCardDeletion, handleCardLike
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._likes = likes;
    this._userID = userID;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDeletion = handleCardDeletion;
    this._handleCardLike = handleCardLike;
    this._element = null;
    this._likeElement = null;
  }

  updateLikes(likeList) {
    if (!this._element) this._createElement();
    this._likes = likeList;
    this._likeElement.textContent = this._likes.length;
  }

  isLiked() {
    if (!this._element) this._createElement();
    return this._likeElement.classList.contains('photo-card__like-button_liked');
  }

  get id() {
    return this._id;
  }

  like() {
    this._likeElement.classList.toggle('photo-card__like-button_liked');
  }

  _createElement() {
    this._element = document
      .querySelector(this._templateSelector).content
      .querySelector('.photo-card').cloneNode(true);
    this._setEventListeners();

    const title = this._element.querySelector('.photo-card__title');
    const image = this._element.querySelector('.photo-card__image');
    title.textContent = this._name;
    title.title = this._name;
    image.alt = this._name;
    image.src = this._link;
    this._likeElement = this._element.querySelector('.photo-card__like-button');
    this._likeElement.textContent = this._likes.length;
    if (this._userID !== this._owner._id)
      this._element.querySelector('.photo-card__del-button').remove();
    this._likes.forEach((owner) => {
      if (owner._id === this._userID) this.like();
    });
  }

  _setEventListeners() {
    if (!this._element) {
      this._createElement();
    }
    this._element.querySelector('.photo-card__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._element.querySelector('.photo-card__like-button').addEventListener('click', () => {
      this._handleCardLike(this);
      this.like();
    });
    this._element.querySelector('.photo-card__del-button').addEventListener('click', () => {
      this._handleCardDeletion(this);
    });
  }

  get element() {
    if (!this._element) {
      this._createElement();
    }
    return this._element;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
