const root = document.querySelector('.root');

const profile = root.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCareer = profile.querySelector('.profile__career');
const profileButtonEdit = profile.querySelector('.profile__edit-button');
const profileButtonAdd = profile.querySelector('.profile__add-button');

const gallery = root.querySelector('.gallery');
const cardTemplate = gallery.querySelector('#photo-card').content;

const popupProfile = document.querySelector('.popup[data-type="profile"]');
const formProfile = popupProfile.querySelector('#form-profile');
const formProfileUserName = formProfile.querySelector('input[name="user-name"]');
const formProfileUserHobby = formProfile.querySelector('input[name="user-hobby"]');

const popupPlace = document.querySelector('.popup[data-type="place"]');
const formPlace = popupPlace.querySelector('#form-place');
const formPlaceName = formPlace.querySelector('input[name="place-name"]');
const formPlaceLink = formPlace.querySelector('input[name="place-link"]');

const popupPhoto = document.querySelector('.popup[data-type="photo"]');
const photoImage = popupPhoto.querySelector('.photo__image');
const photoTitle = popupPhoto.querySelector('.photo__title');


const togglePopup = function (popup) {
  popup.classList.toggle('popup_visible');
}


const openProfileForm = function (event) {
  formProfileUserName.value = profileName.textContent;
  formProfileUserHobby.value = profileCareer.textContent;
  togglePopup(popupProfile);
}

const saveProfile = function (event) {
  event.preventDefault();
  profileName.textContent = formProfileUserName.value;
  profileCareer.textContent = formProfileUserHobby.value;
  togglePopup(popupProfile);
}


const openPlaceForm = function (event) {
  togglePopup(popupPlace);
}

const savePlace = function (event) {
  event.preventDefault();
  addPhotoCard({
    name: formPlaceName.value,
    link: formPlaceLink.value,
    like: false
  });
  formPlaceName.value = '';
  formPlaceLink.value = '';
  togglePopup(popupPlace);
}


const openPhoto = function (event) {
  photoImage.src = event.target.src;
  photoImage.alt = event.target.alt;
  photoTitle.textContent = event.target.alt;
  togglePopup(popupPhoto);
}


const createPhotoCard = function (card) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.photo-card__title').textContent = card.name;
  newCard.querySelector('.photo-card__title').title = card.name;
  newCard.querySelector('.photo-card__image').alt = card.name;
  newCard.querySelector('.photo-card__image').src = card.link;
  newCard.querySelector('.photo-card__image').addEventListener('click', openPhoto);
  // Здравствуйте, Иван! В этом месте я не понял насчёт лайков.
  // Сейчас базу данных имитирует массив. Я в этот массив добавил новое поле хранящее лайк.
  // Таким образом, создается некое подобие хранения данных и их загрузки с сервера.
  // Или этот массив для чего-то другого предназначен?
  //
  // Ну, а в целом, спасибо за замечания! Даже мне самому стало легче читать собственный код. xD
  //
  // if (card.like) {
  //   newCard.querySelector('.photo-card__like-button').classList.add('photo-card__like-button_liked');
  // }
  newCard.querySelector('.photo-card__like-button').addEventListener('click', (event) => {
    event.target.classList.toggle('photo-card__like-button_liked');
  });
  newCard.querySelector('.photo-card__del-button').addEventListener('click', (event) => {
    event.target.closest('.photo-card').remove();
  });
  return newCard;
}

const addPhotoCard = function (card, prepend = true) {
  (prepend) ? gallery.prepend(createPhotoCard(card)) : gallery.append(createPhotoCard(card));
}


initialCards.forEach(card => { addPhotoCard(card, false); });
profileButtonEdit.addEventListener('click', openProfileForm);
profileButtonAdd.addEventListener('click', openPlaceForm);
formProfile.addEventListener('submit', saveProfile);
formPlace.addEventListener('submit', savePlace);
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) togglePopup(popup);
  });
});
document.querySelectorAll('.popup__button-close').forEach((closeButton) => {
  closeButton.addEventListener('click', (event) => {
    togglePopup(event.target.closest('.popup'));
  });
});
