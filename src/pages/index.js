import Api from "../components/API.js";
import Card from "../components/card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo  from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import "../pages/index.css";

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "91b601cc-d5b2-405d-a21a-614e7e8f57e7",
    "Content-Type": "application/json"
  }
});

// Render initial cards
const section = new Section({
  data: initialCards,
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    section.addItems(cardElement);
    }
  }, '.galary__cards');
  
//

api.getInitialCards()
  .then(cards => {
    section.renderItems(cards);
  })
  .catch(err => {
    console.error(err);
  })
const user = new UserInfo("#name", "#description", "#avatar");

//Get User info
api.getUserInfo()
.then(userInfo => {
  user.getUserInfo(userInfo);
})
.catch(err => {
  console.error(`Error fetching user info: ${err}`);
});



/* Elements */ 

//popups
const editPopup = new PopupWithForm('#profile-edit-modal', handleProfileSubmit);
const addcardPopup = new PopupWithForm('#add-card-modal', handleAddCardSubmit);
const imagePopup = new PopupWithImage('#image-modal', handleImageClick); 
const deletePopup = new PopupWithForm('#delete-modal', handleDeleteSubmit);
const avatarPopup = new PopupWithForm('#avatar-modal', handleAvatarSubmit);

//button
const profileEditButton = document.querySelector('#profile-edit-button');
const addNewCardButton = document.querySelector("#profile-add-button");
const avatar = document.querySelector("#avatar-overlay");

//profile name & description / user info / use Profile img
const userNameInput = document.querySelector("#name-input");
const userJobInput = document.querySelector("#description-input");
const userAvatarInput = document.querySelector("#avatar-url-input");


//forms
const profileEditFormElement = document.forms["profile-edit-form"];
const profileAddFormElement = document.forms["add-card-form"];
const deleteFormElement = document.forms["delete-form"];
const avatarFormElement = document.forms["avatar-form"]

//validators
const editFormValidator = new FormValidator(validationSettings, profileEditFormElement);
const addFormValidator = new FormValidator(validationSettings, profileAddFormElement);
const deleteFormValidator = new FormValidator(validationSettings, deleteFormElement);
const avatarFormValidator = new FormValidator(validationSettings, avatarFormElement);

//Form Validators
editFormValidator.enableValidation();
addFormValidator.enableValidation();
deleteFormValidator.enableValidation();
avatarFormValidator.enableValidation();



/* Functions*/
//Create Card
function createCard(item) {
  const cardElement = new Card(item, '#card-template', handleImageClick, handleDeleteSubmit);
return cardElement.getView()
}
/*Event Handlers*/
//image click
function handleImageClick(cardData) {
    imagePopup.open(cardData);
}

//edit profile
function handleProfileSubmit(data) {
  user.setUserInfo({name: data.name, job: data.description});
  editPopup.close(); }

//add card
function handleAddCardSubmit(data) {
  const card = {
    name: data.title,
    link: data.url
  };
  const cardElement = createCard(card);
  section.addItems(cardElement);
  addcardPopup.close();
  profileAddFormElement.reset();
  addFormValidator.disableButton();
}
//avatar
function handleAvatarSubmit(data){
  user.setUserInfo({avatar: data.url});
  avatarPopup.close();
}

//delete
function handleDeleteSubmit(card){
  const confirmButton = document.querySelector('#delete-confirm-button');
  deletePopup.open();
  confirmButton.addEventListener('click', function onConfirmClick() {
    card.deleteCard();
    deletePopup.close();
    confirmButton.removeEventListener('click', onConfirmClick);
  });
}

function openProfileModal(popup) {
  const currentUser = user.getUserInfo();
  userNameInput.value = currentUser.name;
  userJobInput.value = currentUser.job;
  userAvatarInput.value = currentUser.avatar;
  popup.open();
}

// Event Listeners
avatar.addEventListener('click', () =>{openProfileModal(avatarPopup)})

profileEditButton.addEventListener('click', () =>{openProfileModal(editPopup)});

addNewCardButton.addEventListener('click', () => {
  addcardPopup.open();
});



editPopup.setEventListeners();
addcardPopup.setEventListeners();
imagePopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();
