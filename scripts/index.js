// Объявления переменных -----------------------------------------------------
const root = document.querySelector('.root');

const profile = root.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCareer = profile.querySelector('.profile__career');
const profileButtonEdit = profile.querySelector('.profile__edit-button');
const profileButtonAdd = profile.querySelector('.profile__add-button');

const gallery = root.querySelector('.gallery');
const galleryMessage = gallery.querySelector('.gallery__message');
const cardTemplate = gallery.querySelector('#photo-card').content;

const popupProfile = document.querySelector('.popup[data-type="profile"]');
const formProfile = popupProfile.querySelector('#form-profile');
const formProfileName = formProfile.querySelector('input[name="user-name"]');
const formProfileHobby = formProfile.querySelector('input[name="user-hobby"]');

const popupPlace = document.querySelector('.popup[data-type="place"]');
const formPlace = popupPlace.querySelector('#form-place');
const formPlaceName = formPlace.querySelector('input[name="place-name"]');
const formPlaceLink = formPlace.querySelector('input[name="place-link"]');

const popupPhoto = document.querySelector('.popup[data-type="photo"]');
const photoImage = popupPhoto.querySelector('.photo__image');
const photoTitle = popupPhoto.querySelector('.photo__title');


// Объявления функций --------------------------------------------------------
const renderGallery = function (cardElement, render) {
  (render.name === 'remove') ? render.call(cardElement) : render.call(gallery, cardElement);

  if (gallery.querySelector('.photo-card')) {
    galleryMessage.classList.remove('gallery__message_visible');
  }
  else {
    galleryMessage.classList.add('gallery__message_visible');
  }
}

const createPhotoCard = function (card) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.photo-card__title').textContent = card.name;
  newCard.querySelector('.photo-card__title').title = card.name;
  newCard.querySelector('.photo-card__image').alt = card.name;
  newCard.querySelector('.photo-card__image').src = card.link;
  newCard.querySelector('.photo-card__image').addEventListener('click', openPhoto);
  newCard.querySelector('.photo-card__like-button').addEventListener('click', (event) => {
    event.target.classList.toggle('photo-card__like-button_liked');
  });
  newCard.querySelector('.photo-card__del-button').addEventListener('click', (event) => {
    const card = event.target.closest('.photo-card');
    renderGallery(card, card.remove);
  });
  return newCard;
}

const togglePopup = function (popup) {
  popup.classList.toggle('popup_visible');
}

const openProfileForm = function (event) {
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
  let newCard = {
    name: formPlaceName.value,
    link: formPlaceLink.value
  }
  renderGallery(createPhotoCard(newCard), gallery.prepend);
  formPlace.reset();
  togglePopup(popupPlace);
}

const openPhoto = function (event) {
  photoImage.src = event.target.src;
  photoImage.alt = event.target.alt;
  photoTitle.textContent = event.target.alt;
  togglePopup(popupPhoto);
}

const closePopup = function (event) {
  if (event.target.classList.contains('popup__button-close') || event.target === event.currentTarget) {
    togglePopup(event.target.closest('.popup'));
  }
}


// Точка входа ---------------------------------------------------------------
initialCards.forEach((card) => {
  renderGallery(createPhotoCard(card), gallery.append);
});
profileButtonEdit.addEventListener('click', openProfileForm);
profileButtonAdd.addEventListener('click', openPlaceForm);
formProfile.addEventListener('submit', saveProfile);
formPlace.addEventListener('submit', savePlace);
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', closePopup);
});
