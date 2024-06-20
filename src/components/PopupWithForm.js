import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector }, handleFormSubmit) {
      super({ popupSelector });
      this._popupForm = this._popupElement.querySelector(".modal__form");
      this._handleFormSubmit = handleFormSubmit;
      this._inputElements = this._popupForm.querySelectorAll(".modal__input");
      this._buttonElement = this._popupForm.querySelector(".modal__button");
    }

    open() {
      super.open();
    }

    close() {
      super.close();
      this._popupForm.reset();
    }

    _getInputValues() {
      const inputValues = {};
      this._inputElements.forEach((input) => {
        inputValues[input.name] = input.value;
      });
      return inputValues;
    }

    setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }

    renderLoading(isLoading) {
      if (isLoading) {
        this._buttonElement.textContent = "Saving...";
      } else {
        this._buttonElement.textContent = "Save";
      }
    }
  }

