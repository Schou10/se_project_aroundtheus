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

/*Elements*/
//Buttons
const profileEditButton = document.querySelector('#profile-edit-button');
const addNewCardButton = document.querySelector("#profile-add-button");
const closeButtons = document.querySelectorAll('.modal__close');


//Modals
const modals = [...document.querySelectorAll(".modal")];
const profileEditModal = document.querySelector('#profile-edit-modal');
const addCardModal = document.querySelector('#add-card-modal');
const previewImageModal = document.querySelector("#image-modal");

//Profile Data
const profileName = document.querySelector("#name");
const profileDescription = document.querySelector('#profile-description');

//Modal Data
const profileNameInput = document.querySelector('#modal-name');
const profileDescriptionInput = document.querySelector('#modal-description');
const addCardTitle = document.querySelector("#modal-add-title")
const addCardURL = document.querySelector("#modal-url")

//Forms
const profileEditFormElement = document.querySelector("#profile-edit-form");
const profileAddFormElement = document.querySelector("#profile-add-form");

//Cards
const cardListEl = document.querySelector('.galary__cards');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const previewImage = document.querySelector(".modal__image");
const previewTitle = document.querySelector(".modal__card-title");

/*Functions*/

//Open Modal
function openModal(modal) {
    modal.classList.add('modal_opened');
    const handleEscapeClose = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        closeModal(modal);
      }
    };
    const handleOverlayClick = (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    };
  
    modal.handleEscapeClose = handleEscapeClose;
    modal.handleOverlayClick = handleOverlayClick;
  
    document.addEventListener('keydown', handleEscapeClose);
    modal.addEventListener('click', handleOverlayClick);
}
//Close
function closeModal(modal) {
  modal.classList.remove('modal_opened');
  modal.removeEventListener('keydown', (e) => {
    closeModal(modal);
  });
}

//Gets Cards
function getCardElement(cardData){
  //Elements
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector('.card__image');
  const cardTitleEl = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  //listeners
  likeButton.addEventListener('click', () =>{
    likeButton.classList.toggle("card__like-button-active")
  })
  deleteButton.addEventListener('click', () =>{
    cardElement.remove();
  } )
  cardImageEl.addEventListener('click', () =>{
    previewImage.setAttribute('src', cardData.link)
    previewImage.setAttribute('alt', cardData.name)
    previewTitle.textContent = cardData.name;
    openModal(previewImageModal);
  })

  cardImageEl.setAttribute('src', cardData.link);
  cardImageEl.setAttribute('alt', cardData.name);
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

/* Event Handlers */
//Edit Profile
function handleProfileSubmit(e){
  e.preventDefault();
  profileDescription.textContent = profileDescriptionInput.value;
  profileName.textContent = profileNameInput.value;
  closeModal(profileEditModal);
  }
//Add Card
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardListEl[ method ](cardElement);
  }

function handleAddCardSubmit(e){
  e.preventDefault();
  const card = {
    name: addCardTitle.value,
    link: addCardURL.value
  }
  renderCard(card);
  closeModal(addCardModal)
  profileAddFormElement.reset()
}

function fillProfileForm() {
  profileNameInput.value = profileName.textContent
  profileDescriptionInput.value = profileDescription.textContent
}

function openEditProfileModal() {
  fillProfileForm()
  openModal(profileEditModal)
  } 

/* Event Listeners*/
// Edit button
profileEditButton.addEventListener('click', openEditProfileModal);


// Add New Card button
addNewCardButton.addEventListener('click', () => {
  openModal(addCardModal);
});

//Form Submit
profileEditFormElement.addEventListener('submit', handleProfileSubmit);

profileAddFormElement.addEventListener('submit', handleAddCardSubmit);

initialCards.forEach((cardData) =>{
  cardListEl.prepend(getCardElement(cardData));
})

//Close Button 
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});
