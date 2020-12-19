import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler.bind(this);
    this._formElement = this._popup.querySelector('form');
    this._inputList = Array.from(this._formElement.querySelectorAll('input'));
    this._submitButton = this._formElement.querySelector('button[type="submit"]')
    this._setEventListeners();
  }

  _setEventListeners() {
    super._setEventListeners();
    this._formElement.addEventListener('submit', this._submitHandler);
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  toggleLoadingStatus(loadingText) {
    this._submitButton.textContent = loadingText;
    this._submitButton.disabled = !this._submitButton.disabled;
  }
}
