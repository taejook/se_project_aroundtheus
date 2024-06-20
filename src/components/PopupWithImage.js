import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ popupSelector }) {
      super({ popupSelector });
      this._image = this._popupElement.querySelector(".modal__preview-image");
      this._caption = this._popupElement.querySelector(".modal__preview-description");
    }

    open(data) {
      super.open();
      this._image.setAttribute("src", data._link);
      this._image.setAttribute("alt", data._name);
      this._caption.textContent = data._name;
    }
  }