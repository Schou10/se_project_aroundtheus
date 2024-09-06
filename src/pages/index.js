import Api from "../components/API.js";
import Card from "../components/card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo  from "../components/UserInfo.js";
import { validationSettings } from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import "../pages/index.css";

// API Initialized
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "91b601cc-d5b2-405d-a21a-614e7e8f57e7",
    "Content-Type": "application/json"
  }
});

// Render initial cards
const section = new Section({
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    section.addItems(cardElement);
    }
  }, '.galary__cards');
  

const user = new UserInfo("#name", "#description", "#avatar");

//Get User info
api.getUserInfo()
.then(userData => {
  user.setUserInfo(
    {name: userData.name,
      about: userData.about,
      avatar: userData.avatar});
})
.catch(err => {
  console.error(`Error fetching user info: ${err}`);
});

api.getInitialCards()
  .then(cards => {
    section.renderItems(cards);
  })
  .catch(err => {
    console.error(`Error fetcting cards: ${err}`);
  })


/* Elements */ 

//popups
const editPopup = new PopupWithForm('#profile-edit-modal', handleProfileSubmit);
const addCardPopup = new PopupWithForm('#add-card-modal', handleAddCardSubmit);
const imagePopup = new PopupWithImage('#image-modal', handleImageClick); 
const deletePopup = new PopupWithConfirmation('#delete-modal', handleDeleteSubmit);
const avatarPopup = new PopupWithForm('#avatar-modal', handleAvatarSubmit);

//button
const profileEditButton = document.querySelector('#profile-edit-button');
const addNewCardButton = document.querySelector("#profile-add-button");
const avatar = document.querySelector("#avatar-overlay");

//profile name & description / user info / use Profile img
const userNameInput = document.querySelector("#name-input");
const userJobInput = document.querySelector("#description-input");



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
  const cardElement = new Card(item, '#card-template', handleImageClick, handleDeleteSubmit, handleCardLike);
  return cardElement.getView();
}
/*Event Handlers*/
//image click
function handleImageClick(cardData) {
    imagePopup.open(cardData);
}

//edit profile
function handleProfileSubmit(data) {
  console.log(data);
  renderLoading(true, editPopup);
  api.updateUserInfo({
    name: data.name,
    about: data.about
  })
    .then(updatedUserData => {
      user.setUserInfo({
        name: updatedUserData.name, 
        about: updatedUserData.about || updatedUserData.dascription || updatedUserData.bio
      });
    })
    .catch(err => console.error(`Error updating profile: ${err}`))
    .finally(() =>{
      renderLoading(false, editPopup);
      editPopup.close();
    }
    )
   }

// Add card
function handleAddCardSubmit(data) {
  const cardData = {
    name: data.title,
    link: data.url
  };
  renderLoading(true, addCardPopup);
  // Create the Card 
  api.addNewCard(cardData)
    .then((newCardData) => {
      const cardElement = createCard(newCardData);
      section.addItems(cardElement);  
      addCardPopup.close();            
      profileAddFormElement.reset();  
      addFormValidator.disableButton();  
    })
    .catch(err => {
      console.error(`Error adding card: ${err}`);
    })
    .finally(() => {
      renderLoading(false, addCardPopup)
    }
    )
}



//avatar
function handleAvatarSubmit(data){
  renderLoading(true, avatarPopup);
  api.updateUserAvatar({
    avatar: data.url
  })
    .then(updateUserData => {
      user.setUserInfo({
        avatar: updateUserData.avatar
      });
      
    })
    .catch(err => console.error(`Error updating avatar: ${err}`))
    .finally(() =>{
      renderLoading(false, avatarPopup);
      avatarPopup.close();
    });
}

//delete
function handleDeleteSubmit(card){
  const confirmButton = document.querySelector('#delete-confirm-button');
  deletePopup.open();
  
  confirmButton.addEventListener('click', function onConfirmClick() {
    renderLoading(true, deletePopup);
    card.removeCard();
    api.deleteCard(card._id)
      .then(card => {
          
          confirmButton.removeEventListener('click', onConfirmClick)
      })
      .catch(err => {
        console.error(`Error deleting card ${err}`);
      })
      .finally(()=>{
        renderLoading(false, deletePopup);
        deletePopup.close();
      })
  })
}
  
    
    
  

//like
function handleCardLike(card){
  const isLiked = card.isLiked(); 

  const likePromise = isLiked
    ? api.removeLike(card.getId())  
    : api.addLike(card.getId()); 

  likePromise
    .then(updatedCardData => {
      card.updateLikes(updatedCardData.isLiked);  
    })
    .catch(err => console.error(`Error updating like status: ${err}`));
}

function openModal(popup) {
  const currentUser = user.getUserInfo();
  userNameInput.value = currentUser.name;
  userJobInput.value = currentUser.about;
  popup.open();
}

function renderLoading(isSaving, popup){
  if(isSaving){
    if(popup == deletePopup){
      return popup.confirmButton.textContent = "Deleating Card";
    }
    if(popup == addCardPopup){
      return popup.submitButton.textContent = "Creating Card";
    }
    if (popup == editPopup || avatarPopup){
      return popup.submitButton.textContent = "Saving";
    }
    
        
  }
  else{
    if(popup == deletePopup){
      return popup.confirmButton.textContent = "Yes";
    }
    if(popup == addCardPopup){
      return popup.submitButton.textContent = "Create";
    }
    if(popup == editPopup || avatarPopup) {
      return popup.submitButton.textContent = "Save";
    }
}}

// Event Listeners
avatar.addEventListener('click', () =>{openModal(avatarPopup)})

profileEditButton.addEventListener('click', () =>{openModal(editPopup)});

addNewCardButton.addEventListener('click', () => {
  addCardPopup.open();
});



editPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();
