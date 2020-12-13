import './index.css';

import { initialCards, validatorSettings } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import API from '../components/API.js';


// Объявления переменных -----------------------------------------------------

// API ---
const api = new API({
  url: 'https://mesto.nomoreparties.co/v1/cohort-18',
  token: '80cc9190-bc61-4b09-b6f2-ea43f973474f'
});


// Validators ----
const formPlaceValidator = new FormValidator(validatorSettings, document.forms.place);
const formProfileValidator = new FormValidator(validatorSettings, document.forms.profile);
const formAvatarValidator = new FormValidator(validatorSettings, document.forms.avatar);


const userInfo = new UserInfo(
  {
    userNameSelector: '.profile__name',
    userInfoSelector: '.profile__career',
    userAvatarSelector: '.profile__avatar'
  },
  function() {
    api.getUserData('/users/me')
    .then(userData => {
      userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
      userInfo._id = userData._id;
    })
    .catch(error => { console.log(error); });
  }
);


// Popups ----
const popupWithFormAvatar = new PopupWithForm(
  '.popup[data-type="avatar"]',
  function(event) {
    event.preventDefault();

    formAvatarValidator._submitButton.disabled = true;
    formAvatarValidator._submitButton.textContent = 'Сохранение ...';

    const { 'avatar-link': url } = this._getInputValues();

    api.setUserAvatar('/users/me/avatar', url)
    .then(() => { userInfo.setUserAvatar(url); })
    .catch(error => { console.log(error); })
    .finally(() => { this.close(); });
  }
);

const popupWithFormProfile = new PopupWithForm(
  '.popup[data-type="profile"]',
  function(event) {
    event.preventDefault();

    formProfileValidator._submitButton.disabled = true;
    formProfileValidator._submitButton.textContent = 'Сохранение ...';

    const { 'user-name': name, 'user-hobby': info } = this._getInputValues();

    api.setUserData('/users/me', { name, info })
    .then(() => { userInfo.setUserInfo(name, info) })
    .catch(error => { console.log(error); })
    .finally(() => { this.close(); });
  }
);

const popupWithFormPlace = new PopupWithForm(
  '.popup[data-type="place"]',
  function(event) {
    event.preventDefault();

    formPlaceValidator._submitButton.disabled = true;
    formPlaceValidator._submitButton.textContent = 'Создание ...';

    const { 'place-name': name, 'place-link': link } = this._getInputValues();

    api.addCard('/cards', { name, link })
    .then(card => {
      const newCard = new Card(card, '#photo-card', popupWithImage.open.bind(popupWithImage));
      sectionGallery.addItem(newCard.element, true);
    })
    .catch(error => { console.log(error); })
    .finally(() => { this.close(); });
  }
);

const popupWithImage = new PopupWithImage(
  '.popup[data-type="photo"]',
  '.photo__image',
  '.photo__title'
);


// Sections ----
const sectionGallery = new Section(
  {
    renderer: function(element) {
      this.addItem(element);
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
  userInfo.init();

  document.querySelector('.profile__avatar-overlay').addEventListener('click', () => {
    formAvatarValidator.clearStatus();
    formAvatarValidator._submitButton.textContent = 'Сохранить';
    const { avatar } = userInfo.getUserInfo();
    document.forms.avatar.elements['avatar-link'].value = avatar;
    popupWithFormAvatar.open();
  });

  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    formProfileValidator.clearStatus();
    formProfileValidator._submitButton.textContent = 'Сохранить';
    const { name, info } = userInfo.getUserInfo();
    document.forms.profile.elements['user-name'].value = name;
    document.forms.profile.elements['user-hobby'].value = info;
    popupWithFormProfile.open();
  });

  document.querySelector('.profile__add-button').addEventListener('click', () => {
    formPlaceValidator.clearStatus();
    formPlaceValidator._submitButton.textContent = 'Создать';
    popupWithFormPlace.open();
  });

  api.getCards('/cards')
  .then(cards => {
    const cohortCards = cards.map(card => {
      return new Card(card, '#photo-card', popupWithImage.open.bind(popupWithImage)).element
    });
    sectionGallery.renderItems(cohortCards);
  })
  .catch(error => { console.log(error); });

  formAvatarValidator.enableValidation();
  formProfileValidator.enableValidation();
  formPlaceValidator.enableValidation();
}
