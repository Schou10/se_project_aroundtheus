import Card from "../components/card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo  from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import "../pages/index.css";




//Card List
const cardListEl = document.querySelector('.galary__cards');

// Render initial cards
const section = new Section({
  data: initialCards,
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    section.addItems(cardElement);
  }
}, '.galary__cards');
section.renderItems(initialCards);


/* Elements */ 

//popups
const editPopup = new PopupWithForm('#profile-edit-modal', handleProfileSubmit);
const addcardPopup = new PopupWithForm('#add-card-modal', handleAddCardSubmit);
const imagePopup = new PopupWithImage('#image-modal', handleImageClick); 

//button
const profileEditButton = document.querySelector('#profile-edit-button');
const addNewCardButton = document.querySelector("#profile-add-button");

//profile data
const profileName = document.querySelector("#name");

const profileDescription = document.querySelector('#profile-description');

//user info
const userInfo = new UserInfo(profileName, profileDescription)

//modal data
const addCardTitle = document.querySelector("#modal-add-title");
const addCardURL = document.querySelector("#modal-url");

//forms
const profileEditFormElement = document.querySelector("#profile-edit-form");
const profileAddFormElement = document.querySelector("#add-card-form");

//validators
const editFormValidator = new FormValidator(validationSettings, profileEditFormElement);
const addFormValidator = new FormValidator(validationSettings, profileAddFormElement);


/* Functions*/
//Form Validators
editFormValidator.enableValidation();
addFormValidator.enableValidation();

//Create Card
function createCard(item) {
  const cardElement = new Card(item, '#card-template', handleImageClick);
return cardElement.getView()
}

//Handle Image Click
function handleImageClick(cardData) {
    imagePopup.open(cardData);
}



/*Event Handlers*/
//edit profile
function handleProfileSubmit(e) {
  userInfo.setUserInfo(e);
  editPopup.close()
}


//add card
function handleAddCardSubmit(e) {
  e.preventDefault();
  const card = {
    name: addCardTitle.value,
    link: addCardURL.value
  };
  const cardElement = createCard(card);
  section.addItems(cardElement);
  addcardPopup.close();
  profileAddFormElement.reset();
  addFormValidator._disableButton();
}

function openEditProfileModal() {
  userInfo.getUserInfo();
  editPopup.open();
}

// Event Listeners
profileEditButton.addEventListener('click', openEditProfileModal);

addNewCardButton.addEventListener('click', () => {
  addcardPopup.open();
});

profileEditFormElement.addEventListener('submit', handleProfileSubmit);
profileAddFormElement.addEventListener('submit', handleAddCardSubmit);

