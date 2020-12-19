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
      userInfo.setUserInfo({
        id: userData._id,
        name: userData.name,
        info: userData.about,
        avatar: userData.avatar
      });
      return Promise.resolve('Данные пользователя получены!');
    })
    .catch(error => {
      console.log(error);
      return Promise.reject('Ошибка при получении данных пользователя!');
    });
  }
);


// Popups ----
const popupWithFormAvatar = new PopupWithForm(
  '.popup[data-type="avatar"]',
  function(inputValues) {
    this.toggleLoadingStatus('Сохранение ...');

    const { 'avatar-link': url } = inputValues;

    api.setUserAvatar('/users/me/avatar', url)
    .then(() => {
      userInfo.setUserAvatar(url);
      this.close();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.toggleLoadingStatus('Сохранить');
    });
  }
);

const popupWithFormProfile = new PopupWithForm(
  '.popup[data-type="profile"]',
  function(inputValues) {
    this.toggleLoadingStatus('Сохранение ...');

    const { 'user-name': name, 'user-hobby': info } = inputValues;

    api.setUserData('/users/me', { name, info })
    .then(() => {
      userInfo.setUserInfo({ name, info });
      this.close();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.toggleLoadingStatus('Сохранить');
    });
  }
);

const popupWithFormPlace = new PopupWithForm(
  '.popup[data-type="place"]',
  function(inputValues) {
    this.toggleLoadingStatus('Создание ...');

    const { 'place-name': name, 'place-link': link } = inputValues;

    api.addCard('/cards', { name, link })
    .then(card => {
      const newCard = new Card(
        card, '#photo-card', popupWithImage.open.bind(popupWithImage), handleCardDeletion, handleCardLike
      );
      sectionGallery.addItem(newCard.element, true);
      this.close();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.toggleLoadingStatus('Создать');
    });
  }
);

const popupWithFormConfirmation = new PopupWithForm(
  '.popup[data-type="confirmation"',
  function() {}
);

function handleCardDeletion(card) {
  popupWithFormConfirmation.open();
  popupWithFormConfirmation.changeSubmitHandler(function() {
    this.toggleLoadingStatus('Удаление ...');

    api.deleteCard('/cards/', card.id)
    .then(resolved => {
      card.remove();
      this.close();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.toggleLoadingStatus('Да');
    });
  });
}

function handleCardLike(event, cardID) {
  api.toggleLike(`/cards/likes/${cardID}`, event.target.classList.contains('photo-card__like-button_liked'))
  .then(card => {
    this._likes = card.likes;
    this._element.querySelector('.photo-card__like-button').textContent = this._likes.length;
  })
  .catch(error => { console.log(error); });
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
    .then(resolved => {
      api.getCards('/cards')
      .then(cards => {
        const cohortCards = cards.map(card => {
          const newCard = new Card(
            card, '#photo-card', popupWithImage.open.bind(popupWithImage), handleCardDeletion, handleCardLike
          );
          if (card.owner._id !== userInfo.id)
            newCard.element.querySelector('.photo-card__del-button').remove();
          card.likes.forEach((user) => {
            if (user._id === userInfo.id)
              newCard._like(newCard.element.querySelector('.photo-card__like-button'));
          });
          return newCard.element;
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
