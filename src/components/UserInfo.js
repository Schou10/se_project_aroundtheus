export default class UserInfo{
  constructor(name, job){
    this._name = name;
    this._job = job;
    this._nameInput = document.querySelector("#modal-name");
    this._jobInput = document.querySelector("#modal-description");
  }
  getUserInfo(){
    this._nameInput.value = this._name.textContent;
    this._jobInput.value = this._job.textContent;
  }
  setUserInfo(e){
    e.preventDefault();
    this._name.textContent = this._nameInput.value;
    this._job.textContent = this._jobInput.value;
}
  }