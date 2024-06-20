import Popup from "./Popup.js";

export default class PopupwithDelete extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._deletePopup = this._popupElement.querySelector("#modal__confirm");
    this._buttonElement = this._deletePopup.querySelector(".modal__button");
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__button")
      .addEventListener("click", () => {
        this._handleDelete();
      });
    super.setEventListeners();
  }

  setSubmitAction(handleDelete) {
    this._handleDelete = handleDelete;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonElement.textContent = "Saving...";
    } else {
      this._buttonElement.textContent = "Save";
    }
  }
}