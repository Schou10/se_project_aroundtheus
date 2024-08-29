export default class UserInfo{
  constructor(nameSelctor, jobSelector, avatarSelector){
    this._nameElement = document.querySelector(nameSelctor);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector)
    
  }
  getUserInfo(){
    return {
      name: this._nameElement.textContent, 
      job: this._jobElement.textContent};    
  }
  setUserInfo(data){
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.job ;
}
  }
