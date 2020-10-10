import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(imageSelector);
    this._titleElement = this._popup.querySelector(titleSelector);
    this._setEventListeners();
  }

  open(event) {
    this._imageElement.src = event.target.src;
    this._imageElement.alt = event.target.alt;
    this._titleElement.textContent = event.target.alt;
    super.open();
  }
}
