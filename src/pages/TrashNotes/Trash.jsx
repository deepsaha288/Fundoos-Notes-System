import React from "react";
import GetNote from '../../components/GetNote/GetNote';
import Icons from '../../components/Icons/Icon'
import InputBase from '@material-ui/core/InputBase';
import Userservice from '../../service/Userservice'

const service = new Userservice();
const getNote = new GetNote();

export default class TrashNotes extends React.Component {
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
        let token = localStorage.getItem('Token');
        console.log('Trash');
        service.getNote(token).then((res)=>{
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
            <div className="notess">
                    {
                       this.state.notes.filter( data => data.isDeleted === true).map((value, index) => {
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