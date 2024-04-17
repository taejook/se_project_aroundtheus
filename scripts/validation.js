// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, options) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    console.log(errorMessageEl);
}

function checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, options);
    } else {
        hideInputError(formEl, inputEl, options);
    }
}

function setEventListeners(formEl, options){
    const { inputSelector } = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    inputEls.forEach((inputEl) => {
        inputEl.addEventListener('input', (evt)=> {
            checkInputValidity(formEl, inputEl, options);
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