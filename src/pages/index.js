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
const deletePopup = new PopupWithConfirmation('#delete-modal');
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
  editPopup.renderLoading(true);
  api.updateUserInfo({
    name: data.name,
    about: data.about
  })
    .then(updatedUserData => {
      user.setUserInfo({
        name: updatedUserData.name, 
        about: updatedUserData.about || updatedUserData.dascription || updatedUserData.bio
      });
      editPopup.close();
    })
    .catch(err => console.error(`Error updating profile: ${err}`))
    .finally(()=>{
      editPopup.renderLoading(false);
    })
   }

// Add card
function handleAddCardSubmit(data) {
  const cardData = {
    name: data.title,
    link: data.url
  };
  addCardPopup.renderLoading(true);
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
      addCardPopup.renderLoading(false);
    }
    )
}



//avatar
function handleAvatarSubmit(data){
  avatarPopup.renderLoading(true);
  api.updateUserAvatar({
    avatar: data.url
  })
    .then(updateUserData => {
      user.setUserInfo({
        avatar: updateUserData.avatar
      });
      avatarPopup.close();
      avatarFormElement.reset();
    })
    .catch(err => console.error(`Error updating avatar: ${err}`))
    .finally(() =>{
      avatarPopup.renderLoading(false);
      
    });
}

//delete
function handleDeleteSubmit(card){
  deletePopup.setSubmitFunction(() => {
    deletePopup.renderLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        card.removeCard();
        deletePopup.close();
      })
      .catch(err => {
        console.error(`Error deleting card ${err}`);
      })
      .finally(()=>{
        deletePopup.renderLoading(false);
        
      })
  });
  deletePopup.open();  
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

function openProfileModal() {
  const currentUser = user.getUserInfo();
  userNameInput.value = currentUser.name;
  userJobInput.value = currentUser.about;
  editPopup.open();
}



// Event Listeners
avatar.addEventListener('click', () =>{avatarPopup.open()})

profileEditButton.addEventListener('click', () =>{openProfileModal()});

addNewCardButton.addEventListener('click', () => {
  addCardPopup.open();
});



editPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();
