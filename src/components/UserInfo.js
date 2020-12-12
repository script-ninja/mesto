export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }, init) {
    this._nameElement = document.querySelector(userNameSelector);
    this._infoElement = document.querySelector(userInfoSelector);
    this._avatarElement = document.querySelector(userAvatarSelector);
    this._name = this._nameElement.textContent; // Jacques Cousteau
    this._info = this._infoElement.textContent; // Sailor, researcher
    this._avatar = this._avatarElement.src;     // https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg
    this._id = null;
    this.init = init;
  };

  getUserInfo() {
    return {
      name: this._name,
      info: this._info,
      avatar: this._avatar
    };
  }

  setUserInfo(userName, userInfo, userAvatar = null) {
    this._nameElement.textContent = this._name = userName;
    this._infoElement.textContent = this._info = userInfo;
    if (userAvatar) this.setUserAvatar(userAvatar);
  }

  setUserAvatar(url) {
    this._avatarElement.src = this._avatar = url;
  }
}
