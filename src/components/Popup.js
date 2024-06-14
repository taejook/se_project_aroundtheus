export default class Popup {
    constructor(popupSelector) {
        this._popupElement = popupSelector;
        this._closeButton = document.querySelector('#profile-edit-close');
        this._modalContainer =
          document.querySelector(".modal__container");
      }

      open() {
        this._popupElement.classList.add("modal_opened");
        document.addEventListener("keyup", this._handleEscClose);
      }

      close() {
        this._popupElement.classList.remove("modal_opened");
        document.removeEventListener("keyup", this._handleEscClose);
      }

      _handleEscClose = (e) => {
        if (e.key === "Escape") {
          this.close();
        }
      };

      setEventListeners() {
        this._closeButton.addEventListener("click", () => {
          this.close();
        });

        this._popupElement.addEventListener("click", (evt) => {
          if (evt.target.classList.contains("modal__close")) {
            this.close();
          }
        });
      }
    }