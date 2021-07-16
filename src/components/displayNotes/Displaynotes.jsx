import React, { Component } from 'react';
import Icons from '../Icons/Icons';
import "./Displaynotes.scss"
import pin from '../../assests/pin.svg';
import service from '../../services/userService';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    underline: {
        "& .MuiInput-underline:before": {
            position: 'fixed'
        },
        "& .MuiInput-underline:after": {
            position: 'fixed'
        }
    }
};

class Displaynotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openStatus: false,
            title: '',
            description: '',
            image:'',
            collaborators:[],
            file:''
        }

    }

    onDelete = () => {
        let Data = {
            noteIdList: [this.props.value.id],
            isDeleted: true,
        };
        service.deleteNote(Data).then((data) => {
            console.log('Delete Note', data);
            this.props.get();
            this.setState({
                openStatus:false
            })

        }).catch(error => {
            console.log('Delete error', error);
        })
        console.log("delete", Data);
    }

    onArchive = () => {
        let Data = {
            noteIdList: [this.props.value.id],
            isArchived: true,
        };
        
        service.archiveNote(Data).then((data) => {
            console.log('Archive Note', data);
            this.props.get();
            this.setState({
                openStatus:false
            })
        }).catch(error => {
            console.log('Archive error', error);
        })
        console.log("Archive", Data);
    }

    
    onUpdate = () => {
        let Data = {
            noteId: this.props.value.id,
            file:this.state.image,
            title: this.state.title,
            description: this.state.description
        };
        service.updateNote(Data).then((data) => {
            console.log(data);
            this.props.get();
        }).catch(error => {
            console.log('Update error', error);
        })
        console.log(Data);
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => { console.log(this.state); })
    }

   

    render() {
        console.log(this.props.value.imageUrl)
        const { classes } = this.props;
        const collaboratorDetails = this.props.value.collaborators.map((data,index)=>{
        let name = data.firstName
        const chars = name.split('');
       
        return (
            <Tooltip title={name}>
         <div style={{ backgroundColor: this.props.value.color, marginLeft:'5px', marginRight:'4px' }}>
            <Avatar alt={chars[0]} src={chars[0]} />
            </div>
            </Tooltip>
            );
        });
        return (
                <div className="note" style={{
                    backgroundColor: this.props.value.color,
                    }}>
                    <div className="title-pinn"
                        onClick={() => {
                            this.setState({
                                openStatus: !this.state.openStatus,
                                title: this.props.value.title,
                                description: this.props.value.description,
                                file:this.props.value.image
                            })
                        }}>
                  
                        <div className="title-note">
                            <div className='title-frame'>
                                {this.props.value.title}
                            </div>
                            <div>
                            <img className="pin-inp"
                                src={pin} alt="" />
                              </div>  
                        </div>
                    {/* <img src={"http://fundoonotes.incubation.bridgelabz.com/" +this.props.value.imageUrl}/> */}
                        <div className="description-note">
                            {this.props.value.description}
                        </div>
                    </div>
                    <div className="collab-align">
                          {collaboratorDetails}                  
                    </div>
                    <div className="icon-frame">
                        <div className="disp-icn">
                            <Icons
                                archive={() => {
                                    this.onArchive();
                                }}
                                delete={() => {
                                    this.onDelete();
                                }}
                                
                                archiveNote="archiveUpdate"
                                deleteNote="deleteUpdate"
                                colorval="update"
                                val={this.props.value}
                                get={() => { this.props.get() }}/>
                        </div>
                    </div>
                    <Dialog
                    open={this.state.openStatus}>
                    <div
                        className="dialog-body"
                        style={{
                            width: "570px",
                            minHeight: "160px",
                            padding: "15px",
                            backgroundColor: this.props.value.color,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start"
                        }}>
                        <TextField
                            className={classes.underline}
                            name="title"
                            defaultValue={this.props.value.title}
                            multiline
                            onChange={this.handleInput}
                        />
                        <TextField
                            className={classes.underline}
                            name="description"
                            defaultValue={this.props.value.description}
                            multiline
                            onChange={this.handleInput}
                        />
                    </div>
                    <div className="collab-align" style={{
                            backgroundColor: this.props.value.color,
                            marginRight: '4px'
                        }}>
                            {collaboratorDetails}                        
                    </div>
                    <div
                        style={{
                            padding: "10px",
                            backgroundColor: this.props.value.color,
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                        <div className="dialog-icon">
                            <Icons
                                archive={() => {
                                    this.onArchive();
                                }}
                                delete={() => {
                                    this.onDelete();
                                }}
                                colorval="update"
                                archiveNote="archiveUpdate"
                                deleteNote="deleteUpdate"
                                val={this.props.value}
                                get={() => { this.props.get() }}
                                
                                 />
                        </div>
                        <div className="dialog-close"
                            onClick={() => {
                                this.onUpdate();
                                this.setState({
                                    openStatus: !this.state.openStatus
                                });
                            }}>
                            Close
                    </div>
                </div>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(Displaynotes);
