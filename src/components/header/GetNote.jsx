import React, { Component } from 'react';
import service from '../../services/userService'; 
import './Header.scss';
import Createnotes from '../createNotes/Createnotes';
import NoteBuilder from '../NoteBuilder/NoteBuilder';

class GetNote extends Component {
    constructor(props) {
        super(props);
        this.state={
            notes:[]
        }
        
    }

    componentDidMount() {
        this.getNotes();
      }
    
    getNotes = () =>{
        service.getAllNotes().then((data) =>{
            console.log(data);
            this.setState({
                notes:data.data.data.data
            });
            
    
        }).catch(error=>{
          console.log("error",error);
        })
    }
    render() {
        return (
            <div className="create">
                <Createnotes get={this.getNotes}/>
                <NoteBuilder value={this.state.notes} get={this.getNotes}/>
            </div>

        );
    }
}

export default GetNote;
