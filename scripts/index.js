const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const popupUserName = popup.querySelector('.popup__user-name');
const popupUserCareer = popup.querySelector('.popup__user-career');
const popupSaveButton = popup.querySelector('.popup__save-button');
const popupCloseButton = popup.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCareer = profile.querySelector('.profile__career');
const profileEditButton = profile.querySelector('.profile__edit-button');


const popupToggle = function (event) {
  if (popup.classList.contains('popup_closed')) {
    // popupUserName.setAttribute('value', profileName.textContent);
    popupUserName.value = profileName.textContent;
    popupUserCareer.value = profileCareer.textContent;
    popup.classList.remove('popup_closed');
    popup.classList.add('popup_opened');
  }
  else {
    popupUserName.style.borderBottomColor = 'rgba(0, 0, 0, 0.2)';
    popupUserCareer.style.borderBottomColor = 'rgba(0, 0, 0, 0.2)';
    popup.classList.add('popup_closed');
    popup.classList.remove('popup_opened');
  }
}

const saveProfile = function (event) {
  event.preventDefault();
  if (popupUserName.value === '' || popupUserCareer.value === '') {
    popupUserName.style.borderBottomColor = (popupUserName.value === '') ? 'red' : 'rgba(0, 0, 0, 0.2)';
    popupUserCareer.style.borderBottomColor = (popupUserCareer.value === '') ? 'red' : 'rgba(0, 0, 0, 0.2)';
  }
  else {
    profileName.textContent = popupUserName.value;
    profileCareer.textContent = popupUserCareer.value;
    popupToggle();
  }
}


profileEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupForm.addEventListener('submit', saveProfile);
