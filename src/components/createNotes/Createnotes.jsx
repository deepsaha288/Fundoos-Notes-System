import React, { Component } from 'react';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushIcon from '@material-ui/icons/Brush';
import './Createnotes.scss';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import pin from '../../assests/pin.svg';
import service from '../../services/userService';
import Icons from '../Icons/Icons';

const styles = {
    underline: {
        "& .MuiInput-underline:before": {
            position: 'fixed'
        },
        "& .MuiInput-underline:after": {
            position: 'fixed'
        }
    },
    widthInp : {
        "& .MuiInput-underline:before": {
            position: 'fixed',
            height:'50px'
        },
        "& .MuiInput-underline:after": {
            position: 'fixed',
            height:'50px'
        },
        width : '500px'
    }
};

class Createnotes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open:true,
            title: "",
            note: "",
            responce: false,
            color:"#ffffff",
            collaborators:"",
            image:""
        }

    }
    handleClickTitle=()=>{
        console.log("hello");
        this.setState({
            open: false
        })
    }

    handleColor=(data)=>{
        this.setState({
            color:data
        });

    }
    getImage=(data)=>{
        this.setState({
            image:data
        });

    }
    getCollaborator=(data)=>{
        this.setState({
            collaborators:data,
          
        });
    }
  
    handleClickClose=(stateArchive)=>{
        const fromdata=new FormData();
        fromdata.append("file", this.state.image)
        fromdata.append("title", this.state.title)
        fromdata.append("description", this.state.note)
        fromdata.append("isArchived",stateArchive)
        fromdata.append("color",this.state.color)
        if(this.state.collaborators !== ""){
        fromdata.append("collaberators",JSON.stringify([this.state.collaborators]))
        }
        console.log(fromdata, this.state.collaborators)


     if(this.state.title !== "" || this.state.description !== ""){
        console.log("success");
        service.addNotes(fromdata).then((data) =>{
            console.log('data after added note',data);
            this.setState({
                open: true,
                title: "",
                note: "",
                responce: true,
                color:"",
                collaborators:"",
                image:""
              },()=>{console.log(this.state);})
            this.props.get();

        })
        .catch(error=>{
            this.setState({
                open: true,
                title: "",
                note: "",
                responce: true,
                color:"",
                collaborators:"",
                image:""
              },()=>{console.log(this.state);})
            console.log('Error',error);
        });
    }
    else{
        console.log("error");
        this.setState({
            open: true,
                title: "",
                note: "",
                responce: true
              },()=>{console.log(this.state);})
    }
}


handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => { console.log(this.state); })
    }

    render() {
        const { classes } = this.props;
        return (
            <>
          {this.state.open ? (
                <div className="takenote" onClick={this.handleClickTitle} >
                    <div className="input-feild"  >
                        <div className="inputText" type="text" >Take a Note</div>
                            <div classname="imgIconClose">
                                <CheckBoxOutlinedIcon/>
                                <BrushIcon/>
                                <ImageOutlinedIcon/>
                            </div>
                    </div>
                </div>
        ):( 
                <div className="takenote takenote-open" style={{
                    backgroundColor: this.state.color
                    }}>
                    <div className="input-feild-open">
                        <div className="input-title-note" >
                            <TextField 
                                id="standard-multiline-flexible" 
                                className={classes.underline} className={classes.widthInp}
                                 name="title" multiline rowsMax={2} placeholder="Title"
                                onChange={this.handleInput} />
                            <img src={pin} className="pin-inp" alt="" />
                        </div>
                        <div className="input-title-note">
                            <TextField 
                                id="standard-multiline-flexible" 
                                className={classes.underline,classes.widthInp}
                                name="note" multiline rowsMax={2}  placeholder="Note"
                                onChange={this.handleInput} />
                        </div>
                        <div className="icon-open">
                        <div className="icon-open-content">
                            <Icons colorval="create" 
                            archiveNote="archiveCreate" 
                            deleteNote="deleteCreate" 
                            archiveCreate={()=>this.handleClickClose(true,false)}
                            deleteCreate={()=>this.handleClickClose(false,true)}
                            val={this.state} 
                            getImage={this.getImage} 
                            getColor={this.handleColor}
                            getCollaborator={this.getCollaborator}
                            />
                        </div>
                            <div onClick={()=>this.handleClickClose(false,false)} className="icon-open-close">Close</div>

                        </div>
                    </div>
                </div>
         ) }
            </>
        );
    }
}

export default withStyles(styles)(Createnotes);
