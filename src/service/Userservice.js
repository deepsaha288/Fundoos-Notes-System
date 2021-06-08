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

    logout = (token) => {
        console.log(token)
        return axioService.postMethod(`${baseUrl}/user/logout`,
        {
            headers: {
                'Authorization': token,
            }
        })
    }

    addNote = (data, token) => {
        console.log(token);
        return axioService.postMethod(`${baseUrl}notes/addNotes`, data, {
            headers: {
                'Authorization': token,
            }
        })
    }
    getNote = (token) => {
        return axioService.getMethod(`${baseUrl}notes/getNotesList`,{
            headers:{
                'Authorization':token,
            }
        })
    }
    updateNote = (data,token) => {
        return axioService.postMethod(`${baseUrl}notes/updateNotes`, data,{
            headers:{
                'Authorization':token,
            }
        })
    }

    deleteNote = (data,token) => {
        return axioService.postMethod(`${baseUrl}notes/trashNotes`, data,{
            headers:{
                'Authorization':token,
            }
        })
    }
    archieveNote = (data,token) => {
        return axioService.postMethod(`${baseUrl}notes/archiveNotes`, data,{
            headers:{
                'Authorization':token,
            }
        })
    }
    colorChange=(data,token) => {
        return axioService.postMethod(`${baseUrl}notes/changesColorNotes`, data,{
            headers:{
                'Authorization':token,
            }
        })
    }
    trashNote = (token) => {
        return axioService.getMethod(`${baseUrl}notes/getTrashNotesList`,{
            headers:{
                'Authorization':token,
            }
        })
    }
    getArchiveNote = (token) => {
        return axioService.getMethod(`${baseUrl}notes/getArchiveNotesList`,{
            headers:{
                'Authorization':token,
            }
        })
    }

}

export default UserService;