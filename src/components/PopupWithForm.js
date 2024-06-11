import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, loadingButtonText) {
      super({ popupSelector });
      this._inputList = this._popupElement.querySelectorAll(
        ".modal__container-input"
      );
      this._popupForm = this._popupElement.querySelector(".modal__form");
      this._handleFormSubmit = handleFormSubmit;
      this._buttonText = this._submitButton.textContent;

      this._loadingButtonText = loadingButtonText;
    }

    showLoading(){
      this._submitButton.textContent = this._loadingButtonText;
    }

    hideLoading(){
      this._submitButton.textContent = this._buttonText;
    }

    _getInputValues() {
      const inputList = Array.from(
        this._popupForm.querySelectorAll(".modal__input")
      );
      const data = {};
      inputList.forEach((input) => {
        data[input.name] = input.value;
      });
      return data;
    }

    setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  }