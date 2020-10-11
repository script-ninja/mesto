import { initialCards, validatorSettings } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


// Объявления переменных -----------------------------------------------------

// Validators ----
const formPlaceValidator = new FormValidator(validatorSettings, document.forms.place);
const formProfileValidator = new FormValidator(validatorSettings, document.forms.profile);

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__career'
});


// Popups ----
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


// Sections ----
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


// Точка входа ---------------------------------------------------------------
window.onload = function() {
  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    formProfileValidator.clearStatus();
    const { name, info } = userInfo.getUserInfo();
    document.forms.profile.elements['user-name'].value = name;
    document.forms.profile.elements['user-hobby'].value = info;
    popupWithFormProfile.open();
  });
  document.querySelector('.profile__add-button').addEventListener('click', () => {
    formPlaceValidator.clearStatus();
    popupWithFormPlace.open();
  });
  sectionGallery.renderItems();
  formProfileValidator.enableValidation();
  formPlaceValidator.enableValidation();
}