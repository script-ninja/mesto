import { toggleGalleryMessage, openPhoto } from './index.js';

export default class Card {
  // Здравстуйте, Ролан! Вы второй раз подряд проверяете мой проект.
  // Спасибо за похвалу! Отдельное спасибо за то, что прошлую работу
  // быстро проверили, начал делать её за день до жесткого дедлайна
  // и боялся, что не успею, но вы быстро проверили её дважды. Благодарю!
  // Вам тоже успехов!
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

  _createElement() {
    this._element = document.querySelector(this._selector).content.cloneNode(true);
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
    this._element.querySelector('.photo-card__image').addEventListener('click', openPhoto);
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
