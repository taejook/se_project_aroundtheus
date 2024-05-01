export default class FormValidator {
    constructor(settings, formEl) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
  
      this._form = formEl;
    }
  
    _showInputError(inputEl) {
      this.errorMessageElement = this._form.querySelector(`#${inputEl.id}-error`);
      inputEl.classList.add(this._inputErrorClass);
      this.errorMessageElement.textContent = inputEl.validationMessage;
      this.errorMessageElement.classList.add(this._errorClass);
    }
  
    _hideInputError(inputEl) {
      this.errorMessageElement = this._form.querySelector(
        `#${inputEl.id}-error`
      );
      inputEl.classList.remove(this._inputErrorClass);
      this.errorMessageElement.textContent = " ";
      this.errorMessageElement.classList.remove(this._errorClass);
    }
  
    _checkInputValidity(inputEl) {
      if (!inputEl.validity.valid) {
        return this._showInputError(inputEl);
      }
  
      this._hideInputError(inputEl);
    }

  
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputEls)) {
            this.disableButton();
            return;
      }
  
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }

    _hasInvalidInput(inputList) {
        return !inputList.every((inputEl) => inputEl.validity.valid);
    }

    _setEventListeners() {
      this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
      this._submitButton = this._form.querySelector(this._submitButtonSelector);

      this._inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", () => {
          this._checkInputValidity(inputEl);
          this._toggleButtonState();
        });
      });
    }

    disableButton(){
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    }
  
    enableValidation() {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
  
      this._setEventListeners();
    }
  }