import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, loadingButtonText) {
      super(popupSelector);
      this._submitButton = document.querySelector(".modal__button");
      this._handleFormSubmit = handleFormSubmit;
      this._buttonText = this._submitButton.textContent;
      this._loadingButtonText = loadingButtonText;

      this._popupForm = document.querySelector(
        ".modal__container-form"
      );

      this._inputList = document.querySelectorAll(
        ".modal__container-input"
      );
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