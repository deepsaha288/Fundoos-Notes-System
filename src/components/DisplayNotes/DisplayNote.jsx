import React from 'react';
import Icons from '../Icons/Icon'
import InputBase from '@material-ui/core/InputBase';
import UserService from '../../service/Userservice'
import Dialog from '@material-ui/core/Dialog';
import Pin from '../../assets/pin.jpeg';


const service = new UserService();

export default class DisplayNotes extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            title: "",
            description: "",
            open: false,
            noteId: '',
            color:null,
        })
    }

    setColor=(colorValue)=>{

        this.setState({ color : colorValue });

    }

    displayNote = (e) => {
        e.stopPropagation();
        let token = localStorage.getItem("Token");
        let data = {
            title: this.state.title,
            description: this.state.description,
            noteId: this.state.noteId,
        }
        console.log(data.noteId);
        if (data.title != "" && data.description != "") {
            service.displayNote(data, token).then((result) => {
                this.props.displayNote();
                { this.handleClose() }
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    handleDescription = (e) => {
        this.setState({ description: e.target.value })
    }
    handleTitle = (e) => {
        this.setState({ title: e.target.value })

    }
    handleClickOpen = (e, value) => {
        e.stopPropagation();
        this.setState({
            open: true,
            noteId: value.id,
            title: value.title,
            description: value.description
        })
    };

    handleClose = () => {
        console.log("im working");
        this.setState({ open: !this.state.open })
        console.log(this.state.open);
    };

    render() {
      

        return (
            <>
                <div className="notess">
                    {this.props.NotesArray.filter((data) => data.isDeleted === false).filter((data) => data.isArchived === false).reverse().map((value, index) => {
                        var style={backgroundColor:value.color}
                        return (<div className="notebox" style={style}>
                            <div onClick={(e) => this.handleClickOpen(e, value)}>
                              <div className="inline1">  <h4 style={{width:'90%'}}>{value.title}</h4>
                                <img src={Pin} alt=""/></div>
                                <p>{value.description}</p></div>
                            <Icons Notes={value} SetColor={this.setColor} />                         
                        </div>)
                    })}
                   
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <div className="dialogbox">
                        <InputBase
                            defaultValue=""
                            multiline
                            className="inputbas"
                            placeholder="  Title"
                            fullWidth
                            onChange={this.handleTitle}
                            defaultValue={this.state.title}
                            inputProps={{ 'aria-label': 'Title ' }}
                        />

                        <InputBase
                            defaultValue=""
                            multiline
                            fullWidth
                            className="inputbas"
                            placeholder="  Title"
                            onChange={this.handleDescription}
                            defaultValue={this.state.description}
                            inputProps={{ 'aria-label': 'Title ' }}
                        />
                         <div className="enclose">
                                < Icons />
                                <div class="inp">
                                    <input type="button" onClick={(e) => this.displayNote(e)} value="Close" />
                                </div>
                            </div>
                    </div>
                </Dialog>
            </>
        )
    }
}