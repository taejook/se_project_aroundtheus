export default class UserInfo {
    constructor(nameSelector, jobSelector, userAvatar) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatar = document.querySelector(userAvatar);
      }

      getUserInfo() {
        return {
          name: this._nameElement.textContent,
          description: this._jobElement.textContent,
        };
      }

      setUserInfo(userData) {
        this._nameElement.textContent = userData.name;
        this._jobElement.textContent = userData.about;
      }

      setAvatar({ avatar }) {
        this._avatar.src = avatar;
      }
    }