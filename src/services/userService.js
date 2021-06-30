import axios_service from '../services/axiosService';
import {baseURL} from './environment'

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
         return this.axios.post(url,data);
     }

     getAllNotes(){
        let url = baseURL+'notes/getNotesList';
        return this.axios.Get(url)
    }
    
    // addNotes(data){
    //     let url = baseURL+'notes/addNotes';
    //      return this.axios_service.post(url,data);
    //  }

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
        return this.axios.post(url,data);
    }

    forgetpassword =(data)=>{
        let url = baseURL+'user/reset';
        return this.axios.post(url,data);
    }

    updateNote(data) 
    {
        let url = baseURL+'notes/updateNotes';
        return this.axios.post(url,data);
    }

    searchCollaborator(data) 
    {
        let url = baseURL+'user/searchUserList';
        return this.axios.post(url,data);
    }

    addCollaborator(data,noteId) 
    {
        let url = baseURL+"notes/"+noteId+"/AddcollaboratorsNotes";
        return this.axios.post(url,data);
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