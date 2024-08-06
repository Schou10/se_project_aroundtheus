import Card from "../scripts/components/card.js";
import FormValidator from "../scripts/components/FormValidator.js";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" 
  },
  {
    name: "Lake Louisey",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" 
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" 
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" 
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" 
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" 
  }
];

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
} 

/* Elements */ 
//button
const profileEditButton = document.querySelector('#profile-edit-button');
const addNewCardButton = document.querySelector("#profile-add-button");
const closeButtons = document.querySelectorAll('.modal__close');

//modals
const modals = [...document.querySelectorAll(".modal")];
const profileEditModal = document.querySelector('#profile-edit-modal');
const addCardModal = document.querySelector('#add-card-modal');
const previewImageModal = document.querySelector("#image-modal");

//profile data
const profileName = document.querySelector("#name");
const profileDescription = document.querySelector('#profile-description');

//modal data
const profileNameInput = document.querySelector('#modal-name');
const profileDescriptionInput = document.querySelector('#modal-description');
const addCardTitle = document.querySelector("#modal-add-title");
const addCardURL = document.querySelector("#modal-url");

//forms
const profileEditFormElement = document.querySelector("#profile-edit-form");
const profileAddFormElement = document.querySelector("#profile-add-form");

//cards
const cardListEl = document.querySelector('.galary__cards');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const previewImage = document.querySelector(".modal__image");
const previewTitle = document.querySelector(".modal__card-title");

//validators
const editFormValidator = new FormValidator(validationSettings, profileEditFormElement);
const addFormValidator = new FormValidator(validationSettings, profileAddFormElement);


/* Functions*/
//Open Modal
function handleEscClose(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    const modal = document.querySelector('.modal_opened');
    closeModal(modal);
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
}

function openModal(modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', handleEscClose);
  modal.addEventListener('click', handleOverlayClick);
}

//close
function closeModal(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener('click', handleOverlayClick);
}

editFormValidator.enableValidation();
addFormValidator.enableValidation();


/*Event Handlers*/
function handleImageClick(name, link) {
  previewImage.setAttribute('src', link);
  previewImage.setAttribute('alt', name);
  previewTitle.textContent = name;
  openModal(previewImageModal);
}

//edit profile
function handleProfileSubmit(e) {
  e.preventDefault();
  profileDescription.textContent = profileDescriptionInput.value;
  profileName.textContent = profileNameInput.value;
  closeModal(profileEditModal);
}

function renderCard(item) {
  const card = createCard(item);
  cardListEl.prepend(card);
}

function createCard(item) {
  const cardElement = new Card(item, '#card-template', handleImageClick);
return cardElement.getView()
}

//add card
function handleAddCardSubmit(e) {
  e.preventDefault();
  const card = {
    name: addCardTitle.value,
    link: addCardURL.value
  };
  renderCard(card);
  closeModal(addCardModal);
  profileAddFormElement.reset();
}

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  openModal(profileEditModal);
}

// Event Listeners
profileEditButton.addEventListener('click', openEditProfileModal);

addNewCardButton.addEventListener('click', () => {
  openModal(addCardModal);
});

profileEditFormElement.addEventListener('submit', handleProfileSubmit);
profileAddFormElement.addEventListener('submit', handleAddCardSubmit);

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

// Render initial cards
initialCards.forEach((cardData) => {
  renderCard(cardData);
});