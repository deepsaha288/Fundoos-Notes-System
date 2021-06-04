import React from 'react';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushIcon from '@material-ui/icons/Brush';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import InputBase from '@material-ui/core/InputBase';
import Icons from '../Icons/Icon';
import UserService from "../../service/Userservice"

const service = new UserService();


export default class Notes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            title: "",
            description: "",
          
        }
    }
    click = () => {
        this.setState({ open: !this.state.open })
    }
    handleTitle = (e) => {
        this.setState({ title: e.target.value })
        console.log(e.target.value);
    }
    handleDescription = (e) => {
        this.setState({ description: e.target.value })
    }
    close = () => {
        let data = {
            title: this.state.title,
            description: this.state.description
        }
        this.click();
        if (data.title === "" || data.description === "") {

        } else {
            let token = localStorage.getItem('Token');
            service.addNote(data, token).then((data) => {
               this.props.updateData();
              
                console.log(data);
            }).catch((error) => {
                    console.log(error)
                })
        }
    }

    render() {
        return (
            <>
                { this.state.open ?
                    <div className="takenote ">
                        <input type="text" onClick={this.click} placeholder="Take a Note" />
                        < CheckBoxOutlinedIcon />
                        < BrushIcon />
                        <ImageOutlinedIcon />
                    </div> :
                    <div className="brieftakenote">
                        <div className="inlinepin">
                            <InputBase
                                defaultValue=""
                                multiline
                                fullWidth
                                placeholder="  Title"
                                onChange={this.handleTitle}
                                inputProps={{ 'aria-label': 'Title ' }}
                            />
                        </div>
                        <InputBase
                        fullWidth
                        multiline
                            defaultValue=""
                            placeholder="  Take a Note "
                            onChange={this.handleDescription}
                            inputProps={{ 'aria-label': 'Take a note ' }}
                        />
                        <div>
                            <div className="enclose">
                                 < Icons />
                                <div class="inp">
                                    <input type="button" onClick={this.close} value="Close" />
                                </div>
                            </div>
                        </div>
                    </div>}
            </>)
    }
}