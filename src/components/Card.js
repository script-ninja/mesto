export default class Card {
  constructor(
    { _id, name, link, owner, likes },
    templateSelector, handleCardClick, handleCardDeletion, handleCardLike
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._owner = owner;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDeletion = handleCardDeletion;
    this._handleCardLike = handleCardLike;
    this._element = null;
  }

  _like(likeButton) {
    likeButton.classList.toggle('photo-card__like-button_liked');
  }

  _createElement() {
    this._element = document
      .querySelector(this._templateSelector).content
      .querySelector('.photo-card').cloneNode(true);
    const title = this._element.querySelector('.photo-card__title');
    const image = this._element.querySelector('.photo-card__image');
    title.textContent = this._name;
    title.title = this._name;
    image.alt = this._name;
    image.src = this._link;
    this._element.querySelector('.photo-card__like-button').textContent = this._likes.length;
    this._setEventListeners();
  }

  _setEventListeners() {
    if (!this._element) {
      this._createElement();
    }
    this._element.querySelector('.photo-card__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._element.querySelector('.photo-card__like-button').addEventListener('click', (event) => {
      this._handleCardLike(event, this._id);
      this._like(event.target);
    });
    this._element.querySelector('.photo-card__del-button').addEventListener('click', () => {
      this._handleCardDeletion({ id: this._id, element: this._element });
    });
  }

  get element() {
    if (!this._element) {
      this._createElement();
    }
    return this._element;
  }
}
