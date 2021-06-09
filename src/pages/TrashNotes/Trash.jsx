import React from "react";
import Userservice from '../../service/Userservice'
import DisplayNote from '../../components/DisplayNotes/DisplayNote'
import {UserProvider} from '../../components/context/Context'

const service = new Userservice();

export default class TrashNotes extends React.Component {
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
        let token = localStorage.getItem('Token');
        console.log('Trash');
        service.trashNote(token).then((res)=>{
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