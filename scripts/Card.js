import { togglePopup, toggleGalleryMessage } from './index.js';

export default class Card {
  static _template = document.querySelector('#photo-card').content;
  static _popup = document.querySelector('.popup[data-type="photo"]');
  static _popupImage = Card._popup.querySelector('.photo__image');
  static _popupTitle = Card._popup.querySelector('.photo__title');

  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._element = null;
  }

  _like(event) {
    event.target.classList.toggle('photo-card__like-button_liked');
  }

  _delete(event) {
    event.target.closest('.photo-card').remove();
    toggleGalleryMessage();
  }

  _openPhoto(event) {
    Card._popupImage.src = event.target.src;
    Card._popupImage.alt = event.target.alt;
    Card._popupTitle.textContent = event.target.alt;
    togglePopup(Card._popup);
  }

  _createElement() {
    this._element = Card._template.querySelector(this._selector).cloneNode(true);
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
    this._element.querySelector('.photo-card__image').addEventListener('click', this._openPhoto);
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
