import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(imageSelector);
    this._titleElement = this._popup.querySelector(titleSelector);
    this._setEventListeners();
  }

  open(name, link) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._titleElement.textContent = name;
    super.open();
  }
}
