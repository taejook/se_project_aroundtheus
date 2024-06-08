import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
    constructor(popupSelector){
        super(popupSelector);

        this._deleteCardForm =
        this._popupElement.querySelector(".modal__form");

        this._deleteCardButton = this._popupElement.querySelector(".modal__button");
    }

    setEventListeners(){
        super.setEventListeners();

        this._deleteCardForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this._deleteCardButton.textContent = "Saving...";
            this._handleDeleteCardFormSubmit();
            this.close();
        });
    }

    setSubmitAction(action){
        this._handleDeleteCardFormSubmit = action;
    }
}