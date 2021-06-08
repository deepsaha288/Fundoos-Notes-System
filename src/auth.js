class Auth {
    constructor() {
      this.authenticated = false;
    }
  
  
    isAuthenticated() {
        let token =localStorage.getItem('Token');
        if(token !== undefined){
            this.authenticated = true;
        }
      return this.authenticated;
    }
  }
  
  export default new Auth();