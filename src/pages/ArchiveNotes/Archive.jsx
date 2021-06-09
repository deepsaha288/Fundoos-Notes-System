import React from "react";
import UserService from '../../service/Userservice'
import DisplayNote from '../../components/DisplayNotes/DisplayNote'
import {UserProvider} from '../../components/context/Context'

const service = new UserService();


export default class ArchiveNotes extends React.Component {
    constructor(props){
        super(props);
        this.state =({
            notes :[]
        })
    }
    componentDidMount(){
        this.getNote();
    }
    getNote =()=>{
        const getnotes = this.context
        console.log(getnotes) 
        let token = localStorage.getItem('Token');
        console.log('Trash part');
        service.getArchiveNote(token).then((res)=>{
            console.log(res);
            this.setState({notes:res.data.data.data})
            console.log(this.state.notes);
        }).catch((err)=>{
             console.log(err);
        })
    }
    render(){
        return(
            <>
             <UserProvider  value={this.getNote}>           
                <DisplayNote
                          NotesArray={this.state.notes} /> 
                          </UserProvider >
            </>
        )
    }
}