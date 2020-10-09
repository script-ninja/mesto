import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._formElement = this._popup.querySelector('form');
  }

  _setEventListeners() {
    super._setEventListeners();
    this._formElement.addEventListener('submit', this._submitHandler);
  }

  _getInputValues() {}

  close() {
    super.close();
    this._formElement.reset();
  }
}
