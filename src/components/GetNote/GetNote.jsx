import React  from 'react'
import UserService from "../../service/Userservice";
import CreateNote from '../CreateNotes/CreateNote'
import DisplayNote from '../DisplayNotes/DisplayNote'
import {UserProvider} from '../context/Context'

const service = new UserService()

export default class getNote extends React.Component {
    constructor(props){
        super(props)
        this.state={
            notes:[]
        }
    }
    componentDidMount(){
        this.getNote()
    }

    getNote =()=>{
        let token = localStorage.getItem('Token');
        console.log('called');
        service.getNote(token).then((res)=>{
        console.log(res);
        this.filterData(res.data.data.data);
        
        
        })
    }
    
    filterData = (data) => {
        let adults = data.filter(note => {
             if ((note.isArchived!==true) && (note.isDeleted!==true)) return note
            } );
        this.setState({
            notes: adults
        })
    }
    
    render(){
        return (
            <div> 
                <UserProvider  value={this.getNote}>           
                <CreateNote /> 
                <DisplayNote NotesArray={this.state.notes} /> 
                </UserProvider >
            </div>
        )
    }
}