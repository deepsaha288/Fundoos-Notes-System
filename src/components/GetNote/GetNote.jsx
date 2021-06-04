import React  from 'react'
import UserService from "../../service/Userservice";
import CreateNote from '../CreateNotes/CreateNote'
import DisplayNote from '../DisplayNotes/DisplayNote'

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
        this.setState({notes:res.data.data.data})
        console.log(this.state.notes);
        })
    }
    
    
    render(){
        return (
            <div>            
                <CreateNote updateData={this.getNote} /> 
                <DisplayNote updateNote={this.props.updateNote} 
                          NotesArray={this.state.notes} /> 
            </div>
        )
    }
}