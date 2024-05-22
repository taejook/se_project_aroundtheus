import PopUp from "./Popup";

class PopupwithForm extends PopUp{
    constructor (popUpSelector, handleFormSubmit){
        super({popUpSelector});
        this._popupForm = this._popupElement.querySelector('.modal');
        this ._handleFromSubmit = handleFormSubmit;

    }

    open() {
        super.open();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    _getInputValue(){
        const InputList = Array.from(
            this._popupForm.querySelector('.modal__input')
        );
        const data = {};
        InputList.forEach((input) => {
            data[input, name] = input.value;
        });
        return data;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}

// index.js

const newCardPopup = new PopupwithForm('#add-card-modal', () => {});
newCardPopup.open();

newCardPopup.close();