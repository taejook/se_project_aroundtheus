export default class UserInfo {
    constructor(nameSelector, jobSelector){
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
    }

    getUserInfo(){
        return {
            name: this._nameElement.textContent,
            description: this._jobElement.textContent,
        };
    }

    setUserInfo(userData){
        this._nameElement.textContent =  userData.name;
        this._jobElement.textContent = userData.description;
    }
}