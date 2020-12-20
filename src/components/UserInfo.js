export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._nameElement = document.querySelector(userNameSelector);
    this._infoElement = document.querySelector(userInfoSelector);
    this._avatarElement = document.querySelector(userAvatarSelector);
    this._name = this._nameElement.textContent; // Jacques Cousteau
    this._info = this._infoElement.textContent; // Sailor, researcher
    this._avatar = this._avatarElement.src;     // https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg
    this._id = null;
  };

  get id() {
    return this._id;
  }

  getUserInfo() {
    // метод работает правильно
    return {
      name: this._name,
      info: this._info,
      avatar: this._avatar
    };
  }

  setUserInfo({ id = null, name, info, avatar = null }) {
    if (id) this._id = id;
    this._nameElement.textContent = this._name = name;
    this._infoElement.textContent = this._info = info;
    if (avatar) this.setUserAvatar(avatar);
  }

  setUserAvatar(url) {
    this._avatarElement.src = this._avatar = url;
  }
}
