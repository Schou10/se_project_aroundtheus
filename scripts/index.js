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
const addNewCardButton = document.querySelector("#add-button");
const profileEditModalClose = document.querySelector('.modal__close');

//Modals
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileAddModal = document.querySelector('#profile-add-modal');

//Profile
const profileName = document.querySelector("#name");
const profileDescription = document.querySelector('#profile-description');

//Modal Data
const profileEditModalTitle = document.querySelector('#modal-name');
const profileEditModalDescription = document.querySelector('#modal-description');
const addCardTitle = document.querySelector("#modal-add-title")
const addCardURL = document.querySelector("#modal-url")


//Forms
const profileEditForm = document.querySelector["#profile-edit-form"];
const profileAddForm = document.querySelector["#profile-add-form"];

//Cards
const cardListEl = document.querySelector('.galary__cards');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;


/*Functions*/
function closeModal(modal){
  modal.classList.remove("modal_opened");
}

function openModal(modal){
    modal.classList.add("modal_openned");
}

function getCardElement(cardData){
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector('.card__image');
  const cardTitleEl = cardElement.querySelector('.card__title');
  // set the path to the image to the link field of the object
  cardImageEl.setAttribute('src', cardData.link);
  // set the image alt text to the name field of the object
  cardImageEl.setAttribute('alt', cardData.name);
  // set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}

/* Event Handlers */
function handleProfileSubmit(e){
  e.preventDefault();
  profileDescription.textContent = profileEditModalDescription.value;
  profileName.textContent = profileEditModalTitle.value;
  closeModal(profileEditModal);}

/* Event Listeners*/
profileEditButton.addEventListener('click', () => {
  profileEditModalTitle.value = profileName.textContent;
  profileEditModalDescription.value =profileDescription.textContent.trim();
  openModal(profileEditModal);
});

profileEditModalClose.addEventListener('click', closeModal(profileEditModal));


profileEditForm.addEventListener('submit', handleProfileSubmit);

//add button Listener
addNewCardButton.addEventListener('click', openModal(profileAddModal));

initialCards.forEach((cardData) =>{
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
})
