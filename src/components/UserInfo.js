export default class UserInfo{
  constructor(nameSelctor, jobSelector, avatarSelector){
    this._nameElement = document.querySelector(nameSelctor);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector)
    
  }
  getUserInfo(){
    return {
      name: this._nameElement.textContent, 
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src};    
  }
  setUserInfo(data){
    if (data.name) this._nameElement.textContent = data.name;
    if(data.job) this._jobElement.textContent = data.job;
    if(data.avatar) this._avatarElement.src = data.avatar;
  }
}
