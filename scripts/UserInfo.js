export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._nameElement = document.querySelector(userNameSelector);
    this._infoElement = document.querySelector(userInfoSelector);
    this._name = this._nameElement.textContent;
    this._info = this._infoElement.textContent;
  };

  getUserInfo() {
    return { name: this._name, info: this._info };
  }

  setUserInfo(userName, userInfo) {
    this._nameElement.textContent = userName;
    this._infoElement.textContent = userInfo;
    this._name = userName;
    this._info = userInfo;
  }
}
