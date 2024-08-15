import Card from "../components/card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo  from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import "../pages/index.css";

// Render initial cards in using Section Class
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

//profile name & description / user info
const userNameInput = document.querySelector("#name-input");
const userJobInput = document.querySelector("#description-input");

const userInfo = new UserInfo("#name", "#description")

//modal  add card data
const addCardTitle = document.querySelector("#title-input");
const addCardURL = document.querySelector("#url-input");

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
/*Event Handlers*/
//image click
function handleImageClick(cardData) {
    imagePopup.open(cardData);
}

//edit profile
function handleProfileSubmit() {
  const userName =  userNameInput.value.trim();
  const userJob =  userJobInput.value.trim();
  if (userName && userJob){
    userInfo.setUserInfo();
    editPopup.close();
  } else{return;}
  
  }


//add card
function handleAddCardSubmit() {
  const cardTitle = addCardTitle.value.trim();
  const cardURL = addCardURL.value.trim();
  if (cardTitle && cardURL){
  const card = {
    name: addCardTitle.value,
    link: addCardURL.value
  };
  const cardElement = createCard(card);
  section.addItems(cardElement);
  addcardPopup.close();
  profileAddFormElement.reset();
  addFormValidator._disableButton();
  } else {return;}
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

editPopup.setEventListeners();
addcardPopup.setEventListeners();