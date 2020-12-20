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
  }
);


const createCard = (cardData) => {
  return new Card(
    cardData,
    userInfo.id,
    '#photo-card',
    popupWithImage.open.bind(popupWithImage),
    (card) => {
      popupWithFormConfirmation.open();
      popupWithFormConfirmation.changeSubmitHandler(function() {
        this.toggleLoadingStatus('Удаление ...');

        api.deleteCard('/cards/', card.id)
        .then(() => {
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
    },
    (card) => {
      api.toggleLike(`/cards/likes/${card.id}`, card.isLiked())
      .then(response => {
        card.updateLikes(response.likes);
      })
      .catch(error => {
        console.log(error);
      });
    }
  );
}


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
      sectionGallery.addItem(createCard(card).element, true);
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
      return !Boolean(this.container.querySelector('.photo-card'));
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
    api.getUserData('/users/me'),
    api.getCards('/cards')
  ])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      id: userData._id,
      name: userData.name,
      info: userData.about,
      avatar: userData.avatar
    });

    const cohortCards = cards.map(card => {
      return createCard(card).element;
    });
    sectionGallery.renderItems(cohortCards);

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
  .catch(error => {
    console.log(error);
  });
}
