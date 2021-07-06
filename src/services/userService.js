import axios_service from '../services/axiosService';
import {baseURL} from './environment'


const configHeaderUpadate=
    { headers: {
      "Content-Type":  "multipart/form-data",
      Authorization: localStorage.getItem('token')
    }
}
const configHeader=
    { headers: {

      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
}
class UserService{

    constructor(){
        this.axios = new axios_service();
    }

    login(data){
       let url = baseURL+'user/login';
       return this.axios.post(url,data);
    }

    register(data){
       let url = baseURL+'user/userSignUp';
        return this.axios.post(url,data);
    }

    addNotes(data){
        let url = baseURL+'notes/addNotes';
         return this.axios.post(url,data,configHeader);
     }

     getAllNotes(){
        let url = baseURL+'notes/getNotesList';
        return this.axios.Get(url)
    }
    
     changeColor(data) 
    {
        let url = baseURL+'notes/changesColorNotes';
        return this.axios.post(url,data);
    }

    deleteNote(data){
        let url = baseURL+'notes/trashNotes';
        return this.axios.post(url,data);
    }

    archiveNote(data){
        let url = baseURL+'notes/archiveNotes';
        return this.axios.post(url,data,configHeader);
    }

    forgetpassword =(data)=>{
        let url = baseURL+'user/reset';
        return this.axios.post(url,data);
    }
     resetpassword =(data)=>{

        let url = baseURL+'user/reset-password';
        return this.axios.post(url,data,configHeader);
    }

    updateNote(data) 
    {
        let url = baseURL+'notes/updateNotes';
        return this.axios.post(url,data,configHeader);
    }

    searchCollaborator(data) 
    {
        let url = baseURL+'user/searchUserList';
        return this.axios.post(url,data,configHeader);
    }

    addCollaborator(data,noteId) 
    {
        let url = baseURL+"notes/"+noteId+"/AddcollaboratorsNotes";
        return this.axios.post(url,data,configHeader);
    }

    deleteCollaborator(noteId,collabId){
        let url = baseURL+"notes/"+noteId+"/removeCollaboratorsNotes/"+collabId;
        return this.axios.delete(url);
    }

    signOut() 
    {
        let url = baseURL+"user/logout";
        return this.axios.post(url,{});
    }
   

}
export default new UserService();