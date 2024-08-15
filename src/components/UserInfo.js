export default class UserInfo{
  constructor(nameSelctor, jobSelector){
    this._nameElement = document.querySelector(nameSelctor);
    this._jobElement = document.querySelector(jobSelector);
    this._nameInput = document.querySelector(`${nameSelctor}-input`);
    this._jobInput = document.querySelector(`${jobSelector}-input`);
  }
  getUserInfo(){
    this._nameInput.value = this._nameElement.textContent;
    this._jobInput.value = this._jobElement.textContent;
    
    
  }
  setUserInfo(){
    this._nameElement.textContent = this._nameInput.value;
    this._jobElement.textContent = this._jobInput.value; 
    console.log(this._nameElement.textContent, this._jobElement.textContent) 
}
  }
