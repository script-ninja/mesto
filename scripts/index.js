const root = document.querySelector('.root');

const popup = document.querySelector('.popup');

const formProfile = popup.querySelector('#form-profile');
const formProfileUserName = formProfile.querySelector('input[name="user-name"]');
const formProfileUserHobby = formProfile.querySelector('input[name="user-hobby"]');
const formProfileButtonSubmit = formProfile.querySelector('.form__button-submit');

const formPlace = popup.querySelector('#form-place');
const formPlaceName = formPlace.querySelector('input[name="place-name"]');
const formPlaceLink = formPlace.querySelector('input[name="place-link"]');
const formPlaceButtonSubmit = formPlace.querySelector('.form__button-submit');

const profile = root.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCareer = profile.querySelector('.profile__career');
const profileButtonEdit = profile.querySelector('.profile__edit-button');
const profileButtonAdd = profile.querySelector('.profile__add-button');

const gallery = root.querySelector('.gallery');
const cardTemplate = gallery.querySelector('#photo-card').content;
const photoTemplate = popup.querySelector('#photo').content;


const addCard = function (card, setCardPlace = gallery.prepend) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.photo-card__title').textContent = card.name;
  newCard.querySelector('.photo-card__title').title = card.name;
  newCard.querySelector('.photo-card__image').alt = card.name;
  newCard.querySelector('.photo-card__image').src = card.link;
  newCard.querySelector('.photo-card__image').addEventListener('click', togglePopup);
  if (card.like) {
    newCard.querySelector('.photo-card__like-button').classList.add('photo-card__like-button_liked');
  }
  newCard.querySelector('.photo-card__like-button').addEventListener('click', (event) => {
    event.target.classList.toggle('photo-card__like-button_liked');
  });
  newCard.querySelector('.photo-card__del-button').addEventListener('click', (event) => {
    event.target.closest('.photo-card').remove();
  });
  setCardPlace.call(gallery, newCard);
}


const togglePopup = function (event) {
  if (popup.classList.contains('popup_closed')) {
    switch (event.target) {
      case profileButtonEdit:
        formProfileUserName.value = profileName.textContent;
        formProfileUserHobby.value = profileCareer.textContent;
        formProfile.classList.add('form_active');
        break;
      case profileButtonAdd:
        formPlace.classList.add('form_active');
        break;
      default:
        const photo = photoTemplate.cloneNode(true);
        photo.querySelector('.photo__title').textContent = event.target.alt;
        photo.querySelector('.photo__image').src = event.target.src;
        photo.querySelector('.photo__image').alt = event.target.alt;
        popup.append(photo);
        popup.classList.add('popup_type_photo');
        break;
    }
    popup.classList.remove('popup_closed');
    popup.classList.add('popup_opened');
  }
  else {
    if (event.target.classList.contains('popup__button-close') || event.target === event.currentTarget) {
      setTimeout(() => {
        switch(popup.lastElementChild) {
          case popup.querySelector('.photo'):
            popup.querySelector('.photo').remove();
            popup.classList.remove('popup_type_photo');
            break;
          default:
            popup.querySelector('.form_active').classList.remove('form_active');
            break;
        }
      }, 300); // задержка в соответствии с длительностью анимации
      popup.classList.remove('popup_opened');
      popup.classList.add('popup_closed');
    }
  }
}


const submitForm = function (event) {
  event.preventDefault();
  switch (event.target) {
    case formProfile:
      profileName.textContent = formProfileUserName.value;
      profileCareer.textContent = formProfileUserHobby.value;
      break;
    case formPlace:
      addCard({
        name: formPlaceName.value,
        link: formPlaceLink.value,
        like: false
      });
      break;
  }
  togglePopup(event);
}


initialCards.forEach(card => { addCard(card, gallery.append); });
profileButtonEdit.addEventListener('click', togglePopup);
profileButtonAdd.addEventListener('click', togglePopup);
formProfile.addEventListener('submit', submitForm);
formPlace.addEventListener('submit', submitForm);
popup.addEventListener('click', togglePopup);
