import { keys } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === keys.escape) {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup__button-close') || event.target === event.currentTarget) {
        this.close();
      }
    })
  }

  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
