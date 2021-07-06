import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import './Collaborators.scss';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import service from '../../services/userService';
import MenuItem from '@material-ui/core/MenuItem';
import {  MenuList, Popover } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CollabPoper from './collabPoper';


const styles = {
    underline: {
        marginLeft: '20px',
        marginTop: '10px',
        width: '300px',
        "& .MuiInput-underline:before": {
            position: 'fixed'
        },
        "& .MuiInput-underline:after": {
            position: 'fixed'
        }
    }
};

class Collaborators extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collaborators: '',
            collaboratorData: [],
            cancel: false,
            openPopper: false
        }

    }

    handleInput = (e) => {

        let Data = {
            searchWord: e.target.value
        }
        this.setState({
            collaborators: e.target.value,
            cancel: true,
            openPopper:true
        });
        if (e.target.value !== "") {
            service.searchCollaborator(Data).then((data) => {
                this.setState({
                    collaboratorData: data.data.data.details
                });
                console.log('searchCollab', data);
            }).catch(error => {
                console.log('searchCollab', error);
            });
        }
    }

    addColaborator(val) {
        console.log()
        let collaborators = val;
        service.addCollaborator(collaborators, this.props.note.id).then((data) => {
            console.log('data', data);
            this.props.getNotes();
            this.props.getCloseStatus(false);
        }).catch(error => {
            console.log('search', error);
        });
    }

    colabArr = (val) => {
        return (
            <MenuItem
                style={{ cursor: "pointer" }}>
                <div style={{
                    width: "350px",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div>
                        {val.email}
                    </div>
                    <div>
                        {val.firstName}
                    </div>
                </div>
            </MenuItem>

        )
    }

    onDelete = (userId) => {
        service.deleteCollaborator(this.props.note.id, userId).then((data) => {
            this.props.getNotes();
            console.log('data', data);
        }).catch(error => {
            console.log('search', error);
        });
    }

    saveCollaborator = () => {
        this.props.getNotes();
        this.setState({
            collaboratorData: []
        });
        this.props.getCloseStatus(false);
    }

    closeDialog = () => {
        this.setState({
            collaboratorData:[]
        });
        this.props.getCloseStatus(false);

    }

    onCancel = () => {
        this.setState({
            collaboratorData:[],
            cancel: false
        });
    }

    render() {
        const { classes } = this.props;
        const collaboratorDetails = this.props.note.collaborators.map((data, index) => {
            let name = data.firstName
            const chars = name.split('');
            return (
                <MenuItem key={index} >
                    <div className="collab-dtl">
                        <Tooltip title={name}>
                            <div style={{
                                marginLeft: '5px',
                                marginRight: '4px'
                            }}>
                                <Avatar alt={chars[0]} src={chars[0]} />
                            </div>
                        </Tooltip>
                        <span className="email-disp">{data.email}</span>
                        <span className='on-close' >
                            <CloseIcon onClick={() => this.onDelete(data.userId)} />
                        </span>
                    </div>
                </MenuItem>
            );
        });
        return (
            <div>
                <Dialog
                    open={this.props.open}>
                    <div
                        className="dialog-body"
                        style={{
                            width: "570px",
                            minHeight: "160px",
                            padding: "15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>
                        <div
                            style={{ borderBottom: "2px solid #e4d6d6" }}>
                            Collaborators
                        </div>

                        <div>
                            <div className="owner">
                                <div className="avatar-img">
                                    <Avatar  alt="" src="" />
                                </div>
                                <div className="owner-title">
                                <div className="name-txt">{localStorage.getItem('first')} {localStorage.getItem('last')}  (Owner)</div>
                                <div className="email-txt">{localStorage.getItem('email')}</div>
                                </div>
                            </div>
                            <div>
                                <MenuList>{collaboratorDetails}</MenuList>
                            </div>
                            <div className="search-cnt">
                                <div className="plus">
                                <PersonAddIcon /></div>
                                <TextField
                                    className={classes.underline}
                                    name="collaborators"
                                    multiline
                                    placeholder="Search"
                                    onChange={this.handleInput}
                                />
                                <div className="on-close" style={{ display: this.state.cancel ? 'block' : 'none' }}>
                                    <CloseIcon onClick={this.onCancel} />
                                </div>
                            </div>
                        </div>

                        <div className='collab-btn'>
                            <div className='collab-btn-cnt'>
                                <span onClick={this.closeDialog}>Cancel</span>
                                <span onClick={this.saveCollaborator}>Save</span>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        maxHeight: "350px",
                        overflow: "scroll"
                    }}>
                        <CollabPoper List={this.state.collaboratorData}
                        open={this.state.openPopper}
                        collabAdd={(data)=>
                                    this.addColaborator (data)
                        }/>
                       
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(Collaborators);
