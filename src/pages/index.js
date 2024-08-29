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
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json"
  }
});

// Render initial cards in using Section Class
api.getInitialCards()
  .then(cards => {
    const section = new Section({
  data: cards,
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    section.addItems(cardElement);
    }
  }, '.galary__cards');
  section.renderItems(cards);
  })
  .catch(err => {
    console.error(err);
  })



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

//forms
const profileEditFormElement = document.forms["profile-edit-form"];
const profileAddFormElement = document.forms["add-card-form"];

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
function handleProfileSubmit(data) {
  userInfo.setUserInfo({name: data.name, job: data.description});
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

function openEditProfileModal() {
  const currentUser = userInfo.getUserInfo();
  userNameInput.value = currentUser.name;
  userJobInput.value = currentUser.job;
  editPopup.open();
}

// Event Listeners
profileEditButton.addEventListener('click', openEditProfileModal);

addNewCardButton.addEventListener('click', () => {
  addcardPopup.open();
});

editPopup.setEventListeners();
addcardPopup.setEventListeners();
imagePopup.setEventListeners();


//fetch
