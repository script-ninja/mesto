import { toggleGalleryMessage } from './index.js';

export default class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._element = null;
    this._handleCardClick = handleCardClick;
  }

  _like(event) {
    event.target.classList.toggle('photo-card__like-button_liked');
  }

  _delete(event) {
    event.target.closest('.photo-card').remove();
    toggleGalleryMessage();
  }

  _createElement() {
    this._element = document.querySelector(this._templateSelector).content.cloneNode(true);
    const title = this._element.querySelector('.photo-card__title');
    const image = this._element.querySelector('.photo-card__image');
    title.textContent = this._name;
    title.title = this._name;
    image.alt = this._name;
    image.src = this._link;
    this._setEventListeners();
  }

  _setEventListeners() {
    if (!this._element) {
      this._createElement();
    }
    this._element.querySelector('.photo-card__image').addEventListener('click', this._handleCardClick);
    this._element.querySelector('.photo-card__like-button').addEventListener('click', this._like);
    this._element.querySelector('.photo-card__del-button').addEventListener('click', this._delete);
  }

  get element() {
    if (!this._element) {
      this._createElement();
    }
    return this._element;
  }
}
