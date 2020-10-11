import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


// Объявления переменных -----------------------------------------------------
const root = document.querySelector('.root');

const profile = root.querySelector('.profile');
const profileButtonEdit = profile.querySelector('.profile__edit-button');
const profileButtonAdd = profile.querySelector('.profile__add-button');

const formProfile = document.forms.profile;
const formProfileName = formProfile.elements['user-name'];
const formProfileHobby = formProfile.elements['user-hobby'];

const formPlace = document.forms.place;

const validatorSettings = {
  inputSelector: '.form__text',
  invalidInputClass: 'form__text_invalid',
  submitSelector: '.form__button-submit',
  submitDisabledClass: 'form__button-submit_disabled'
};
formPlace.validator = new FormValidator(validatorSettings, formPlace);
formProfile.validator = new FormValidator(validatorSettings, formProfile);

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__career'
});

// ___ Popups ___
const popupWithFormProfile = new PopupWithForm(
  '.popup[data-type="profile"]',
  function(event) {
    event.preventDefault();
    const { 'user-name': name, 'user-hobby': info } = this._getInputValues();
    userInfo.setUserInfo(name, info);
    this.close();
  }
);

const popupWithFormPlace = new PopupWithForm(
  '.popup[data-type="place"]',
  function(event) {
    event.preventDefault();
    const { 'place-name': name, 'place-link': link } = this._getInputValues();
    const newCard = new Card({ name, link }, '#photo-card', popupWithImage.open.bind(popupWithImage));
    sectionGallery.addItem(newCard.element, 'prepend');
    this.close();
  }
);

const popupWithImage = new PopupWithImage('.popup[data-type="photo"]', '.photo__image', '.photo__title');
// ______________

const sectionGallery = new Section(
  {
    items: initialCards.map(function(card) {
      return new Card(card, '#photo-card', popupWithImage.open.bind(popupWithImage)).element;
    }),
    renderer: function(element) {
      this.addItem(element, 'append');
    },
    isEmpty: function() {
      return !Boolean(this._container.querySelector('.photo-card'));
    },
    toggleEmptyMessage: function() {
      document
        .querySelector('.gallery__message')
        .classList[this.isEmpty() ? 'add' : 'remove']('gallery__message_visible');
    },
    handleItemRemoval: function(event) {
      if (event.target.classList.contains('photo-card__del-button')) {
        this.toggleEmptyMessage();
      }
    }
  },
  '.gallery'
);


// Объявления функций --------------------------------------------------------
const openProfileForm = function (event) {
  formProfile.validator.clearStatus();
  const { name, info } = userInfo.getUserInfo();
  formProfileName.value = name;
  formProfileHobby.value = info;
  popupWithFormProfile.open();
}

const openPlaceForm = function (event) {
  formPlace.validator.clearStatus();
  popupWithFormPlace.open();
}


// Точка входа ---------------------------------------------------------------
window.onload = function() {
  sectionGallery.renderItems();
  profileButtonEdit.addEventListener('click', openProfileForm);
  profileButtonAdd.addEventListener('click', openPlaceForm);
  formProfile.validator.enableValidation();
  formPlace.validator.enableValidation();
}
