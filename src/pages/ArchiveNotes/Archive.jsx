import React from "react";
import GetNote from '../../components/GetNote/GetNote';
import Icons from '../../components/Icons/Icon'
import InputBase from '@material-ui/core/InputBase';
import UserService from '../../service/Userservice'

const service = new UserService();
const getNote = new GetNote();

export default class ArchiveNotes extends React.Component {
    constructor(props){
        super(props);
        this.state =({
            notes :[]
        })
    }
    componentDidMount(){
        this.note();
    }
    note =()=>{
        const getnotes = this.context
        console.log(getnotes) 
        let token = localStorage.getItem('Token');
        console.log('Trash part');
        service.getNote(token).then((res)=>{
            console.log(res);
            this.setState({notes:res.data.data.data})
            console.log(this.state.notes);
            getnotes()
        }).catch((err)=>{
             console.log(err);
        })
    }
    render(){
        return(
            <>
            <div className="notess">
                    {
                       this.state.notes.filter( data => data.isArchived === true).map((value, index) => {
                        return (<div className="notebox " key={index} >

                            <InputBase
                                style={{ paddingLeft: '8px' }}
                                defaultValue={value.title}
                                multiline
                                className=""
                                placeholder="  Description"
                                inputProps={{ 'aria-label': 'Description ' }}
                            />
                            <InputBase
                                style={{ paddingLeft: '8px' }}
                                defaultValue={value.description}
                                multiline
                                className=""
                                placeholder="  Description"
                                inputProps={{ 'aria-label': 'Description ' }}
                            />
                            <Icons Notes={value} />
                        </div>)
                    })}
                </div>
            </>
        )
    }
}