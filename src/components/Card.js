export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteCard, handleLikeCard) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this.id = data._id;
    this._isLiked = data.isLiked;
    this._handleLikeCard = handleLikeCard;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    //get the card view
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".cards__title");

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name + " " + "Image";
    this._cardTitleEl.textContent = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
        //set event listeners
        this._handleLikeStatus();
        this._setEventListeners();
        //return the card
        return this._cardElement;

  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      console.log("test", this);
      this._handleLikeCard(this);
    });

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this)
    );

    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick(this)
    );
  }

  _handleLikeStatus() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  updateLikesView() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  isLiked() {
    return this._isLiked;
  }

  handleDelete() {
    this._cardElement.remove();
  }
}