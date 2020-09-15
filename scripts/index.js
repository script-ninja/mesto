import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

export { togglePopup, toggleGalleryMessage };


// Объявления переменных -----------------------------------------------------
const root = document.querySelector('.root');

const profile = root.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCareer = profile.querySelector('.profile__career');
const profileButtonEdit = profile.querySelector('.profile__edit-button');
const profileButtonAdd = profile.querySelector('.profile__add-button');

const gallery = root.querySelector('.gallery');
const galleryMessage = gallery.querySelector('.gallery__message');

const popupProfile = document.querySelector('.popup[data-type="profile"]');
const formProfile = document.forms.profile;
const formProfileName = formProfile.elements['user-name'];
const formProfileHobby = formProfile.elements['user-hobby'];

const popupPlace = document.querySelector('.popup[data-type="place"]');
const formPlace = document.forms.place;
const formPlaceName = formPlace.elements['place-name'];
const formPlaceLink = formPlace.elements['place-link'];

const validatorSettings = {
  inputSelector: ".form__text",
  invalidInputClass: "form__text_invalid",
  submitSelector: ".form__button-submit",
  submitDisabledClass: "form__button-submit_disabled"
};
formPlace.validator = new FormValidator(validatorSettings, formPlace);
formProfile.validator = new FormValidator(validatorSettings, formProfile);


// Объявления функций --------------------------------------------------------
const toggleGalleryMessage = function () {
  const hasCard = Boolean(gallery.querySelector('.photo-card'));
  galleryMessage.classList[hasCard ? 'remove' : 'add']('gallery__message_visible');
}

const keyEscHandler = function (event) {
  const openedPopup = document.querySelector('.popup_visible');
  if (openedPopup && event.key === 'Escape') {
    togglePopup(openedPopup);
  }
}

const togglePopup = function (popup) {
  popup.classList.toggle('popup_visible');
  const popupClosed = !popup.classList.contains('popup_visible');
  document[popupClosed ? 'removeEventListener' : 'addEventListener']('keydown', keyEscHandler);
}

const openProfileForm = function (event) {
  formProfile.validator.clearStatus();
  formProfileName.value = profileName.textContent;
  formProfileHobby.value = profileCareer.textContent;
  togglePopup(popupProfile);
}

const saveProfile = function (event) {
  event.preventDefault();
  profileName.textContent = formProfileName.value;
  profileCareer.textContent = formProfileHobby.value;
  togglePopup(popupProfile);
}

const openPlaceForm = function (event) {
  togglePopup(popupPlace);
}

const savePlace = function (event) {
  event.preventDefault();
  const cardData = {
    name: formPlaceName.value,
    link: formPlaceLink.value
  };
  const newCard = new Card(cardData, '.photo-card');
  gallery.prepend(newCard.element);
  toggleGalleryMessage();
  togglePopup(popupPlace);
  formPlace.validator.clearStatus();
}

const closePopup = function (event) {
  if (
    event.target.classList.contains('popup__button-close') ||
    event.target === event.currentTarget
  ) {
    togglePopup(event.target.closest('.popup'));
  }
}

const renderInitialCards = function () {
  initialCards.forEach((card) => {
    const newCard = new Card(card, '.photo-card');
    gallery.append(newCard.element);
  });
  toggleGalleryMessage();
}


// Точка входа ---------------------------------------------------------------
window.onload = function() {
  renderInitialCards();
  profileButtonEdit.addEventListener('click', openProfileForm);
  profileButtonAdd.addEventListener('click', openPlaceForm);
  formProfile.addEventListener('submit', saveProfile);
  formPlace.addEventListener('submit', savePlace);
  document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('click', closePopup);
  });
  formProfile.validator.enableValidation();
  formPlace.validator.enableValidation();
}
