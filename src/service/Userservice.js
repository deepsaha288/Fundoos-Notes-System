import Axios from './axioService'

const axioService = new Axios();
const baseUrl='http://fundoonotes.incubation.bridgelabz.com/api/'

class UserService{
    Registration =(data)=>{
        return axioService.postMethod(`${baseUrl}user/userSignup`,data)
    }
    login = (data) => {
        return axioService.postMethod(`${baseUrl}user/login`, data);
    }
}
export default UserService;