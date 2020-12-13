import './index.css';

import { validatorSettings } from '../utils/constants.js';
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
    return api.getUserData('/users/me')
    .then(userData => {
      userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
      userInfo._id = userData._id;
      return Promise.resolve('Done!');
    })
    .catch(error => {
      console.log(error);
      return Promise.reject('Error!');
    });
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
      const newCard = new Card(
        card, '#photo-card', popupWithImage.open.bind(popupWithImage), handleCardDeletion
      );
      sectionGallery.addItem(newCard.element, true);
    })
    .catch(error => { console.log(error); })
    .finally(() => { this.close(); });
  }
);

const popupWithFormConfirmation = new PopupWithForm(
  '.popup[data-type="confirmation"',
  function(event) {
    event.preventDefault();
    this._formElement.querySelector('button[type="submit"]').textContent = 'Удаление ...';

    // api
    api.deleteCard('/cards/', this._card.id)
    .then(ok => {
      this._card.element.remove();
    })
    .catch(error => { console.log(error); })
    .finally(() => {
      this.close();
      setTimeout(() => {
        this._formElement.querySelector('button[type="submit"]').textContent = 'Да';
      }, 300);
    });
  }
);

function handleCardDeletion(card) {
  popupWithFormConfirmation.open(card);
}

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
  Promise.all([
    userInfo.init()
    .then(ok => {
      api.getCards('/cards')
      .then(cards => {
        const cohortCards = cards.map(card => {
          const newCard = new Card(
            card, '#photo-card', popupWithImage.open.bind(popupWithImage), handleCardDeletion
          ).element;
          if (card.owner._id !== userInfo._id)
            newCard.querySelector('.photo-card__del-button').remove();
          return newCard;
        });
        sectionGallery.renderItems(cohortCards);
      })
      .catch(error => { console.log(error); })
    })
  ])
  .then(resolved => {
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

    formAvatarValidator.enableValidation();
    formProfileValidator.enableValidation();
    formPlaceValidator.enableValidation();
  })
  .catch(error => { console.log(error); });
}
