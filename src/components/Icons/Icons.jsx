import React, { Component } from 'react';
import './Icons.scss';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Popper from './popper';
import service from '../../services/userService';
import Tooltip from '@material-ui/core/Tooltip';
import Collaborators from '../Collaborators/Collaborators';

class Icons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            openStatus: false,
            
        }

    }
    handleClose = () => {
        this.setState({
            anchorEl: null
        })

    };

    menuClick = (event) => {
        this.setState({

            anchorEl: event.currentTarget
        })
    }

    getPhoto = (e) => {
        console.log(e.target.files)
        const fromdata=new FormData();
        fromdata.append("noteId", this.props.val.id)
        fromdata.append("file", e.target.files[0].name)
        fromdata.append("title", this.props.val.title)
        fromdata.append("description", this.props.val.description)
        console.log(this.props.val.id)
        console.log(fromdata.entries())
        let token = localStorage.getItem("Token");

        service.updateNote(fromdata).then((result) => {
          console.log(result);
        }).catch((err) => {
          console.log(err);
        })
      }

    onSetColor = (color) => {
        if (this.props.colorval === "update") {
            let Data = {
                color: color.code,
                noteIdList: [this.props.val.id]
            };
            service.changeColor(Data).then((data) => {
                console.log('Color Note', data);
                 this.props.get();
            }).catch(error => {
                console.log('Color error', error);
            });
            console.log("Color", Data);
        } else {
            this.props.getColor(color.code);
        }
    }

    onSetStatus = (val) => {
        this.setState({
            openStatus: val
        });
    }

    dialogopen = () => {
        this.setState({
            openStatus: true
        });
    }

    render() {
        return (
            <div>
                <div className="icon-open-content">
                    <div className="note-icons-hover">
                        <Tooltip title="Reminder">
                            <AddAlertOutlinedIcon className="i-disp" />
                        </Tooltip>
                    </div>
                    <div className="note-icons-hover">
                        <Tooltip title="Collaborator">
                            <PersonAddOutlinedIcon className="i-disp" onClick={this.dialogopen} />
                        </Tooltip>
                    </div>
                    <div className="note-icons-hover">
                        <Popper putColor={(Data) => {
                            this.onSetColor(Data)
                        }} />
                    </div>
                    <div className="note-icons-hover">
                        <Tooltip title="Image">
                            {/* <ImageOutlinedIcon className="icon-display" > */}
                            <input type="file" onChange={(e) =>{ this.getPhoto(e);}} />
                            {/* </ImageOutlinedIcon> */}
                        </Tooltip>
                    </div>
                    <div className="note-icons-hover">
                        <Tooltip title="Archive">
                            <ArchiveOutlinedIcon className="i-disp" onClick={() => {
                                if (this.props.archiveNote === "archiveUpdate") {
                                    this.props.archive()
                                }
                                else {
                                    this.props.archiveCreate()
                                }
                            }} />
                        </Tooltip>
                    </div>
                    <div >
                        <div className="note-icons-hover">
                            <Tooltip title="More">
                                <MoreVertOutlinedIcon className="i-disp" onClick={this.menuClick} />
                            </Tooltip>
                        </div>

                        <Menu
                            id="simple-menu"
                            keepMounted
                            anchorEl={this.state.anchorEl}
                            onClose={this.handleClose}
                            open={Boolean(this.state.anchorEl)}
                        >
                            <MenuItem onClick={() => {
                                if (this.props.deleteNote === "deleteUpdate") {
                                    this.props.delete()
                                    this.handleClose()
                                }
                                else{
                                    this.props.deleteCreate()
                                }
                            }
                            }>Delete Node</MenuItem>
                            <MenuItem >Add Label</MenuItem>
                            <MenuItem >Add Drawing</MenuItem>
                            <MenuItem >Make a Copy</MenuItem>
                            <MenuItem >Show Checkboxes</MenuItem>

                        </Menu>

                    </div>
                </div>
                <Collaborators
                    open={this.state.openStatus}
                    note={this.props.val}
                    getCloseStatus={(Data) => {
                        this.onSetStatus(Data);
                    }}
                    getNotes={() => { this.props.get() }} />
            </div>
        );
    }
}

export default Icons;
