export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteCard, handleLikeCard) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this.id = data._id;
    this.isLiked = data.isLiked;
    this._handleLikeCard = handleLikeCard;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {

      this._handleLikeCard(this);
    });

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this)
    );

    this._cardImageEl.addEventListener("click", () =>
      this._handleImageClick(this)
    );
  }

  handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _renderLikes(){
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  setIsLiked(isLiked) {
    // set instance variable
     this.isLiked = isLiked;
     this._renderLikes();
  }

  _isLiked() {
    return this.isLiked;
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
        this._renderLikes()
        this._setEventListeners();
        //return the card
        return this._cardElement;

  }
}