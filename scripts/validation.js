// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  function hideInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = '';
    errorMessageEl.classList.remove(errorClass);
  }

function checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
        return showInputError(formEl, inputEl, options);
    }
    hideInputError(formEl, inputEl, options);
}
function hasInvalidInput(inputList){
    return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}) {
    if(hasInvalidInput(inputEls)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
        return;
    }
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
    ;
}

function setEventListeners(formEl, options){
    const { inputSelector } = options;
    const { submitButtonSelector } = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(submitButtonSelector);

    inputEls.forEach((inputEl) => {
        inputEl.addEventListener('input', (evt)=> {
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(inputEls, submitButton, options);
        });
    });
}

function enableValidation(options) {
    formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
        formEl.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formEl, options);
        //look for all inputs inside of form
        //loop through all the inputs see if all are valid
         //if input is not valid
         //get validation message
          //add error class to input
         //display error messagbe
         //disable button
        //if all inputs are valid
        //enable button
        //reset error messages
    });
}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  }

enableValidation(config);