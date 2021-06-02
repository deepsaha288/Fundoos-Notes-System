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
    forgetpassword =(data)=>{
        return axioService.postMethod(`${baseUrl}user/reset`,data)
    }
    resetpassword =(data,token)=>{
        console.log(token);
        console.log(data);
        return axioService.postMethod(`${baseUrl}user/reset-password`,data,{
            headers:{
                'Authorization':token,
            }})
    }
}
export default UserService;