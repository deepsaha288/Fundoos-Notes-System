import React from 'react'
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import './Icon.css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserService from '../../service/Userservice'

const service = new UserService();

export default class Icon extends React.Component{
  constructor(props){
    super(props);
    this.state =({anchorEl:null,
    show:false,
  color:""})

  }
  
    archieveNote = (value)=>{
        console.log(value);
        let data = {
          noteIdList: [value.id],
          isArchived: true,
        };
        let token = localStorage.getItem("Token");
        console.log(data)
        service.archieveNote(data,token)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log("error = " + err);
          });
    }
    handleClick = (event) => {
      this.setState({anchorEl:event.currentTarget})
    };
  
     handleClose = () => {
      this.setState({anchorEl:null})
    };

    changeShow =()=>{
      this.setState({show:!this.state.show})
    }

    deleteNote = (e,value) => {
      let token = localStorage.getItem('Token');
      console.log("hai object delete");
      let data = {
          isDeleted: true,
          noteIdList: [value.id]
      }
      service.deleteNote(data, token).then((result) => {
          this.handleClose();
          window.location.reload();
          console.log(result);
      }).catch((err) => {
          console.log(err);
      })
  }
  updateNote = (e,colorValue,value) => {
    let token = localStorage.getItem("Token");
     let data = {
     noteIdList:[value.id],
     color:colorValue,
   }

        service.colorChange(data, token).then((result) => {
            console.log(data);
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
}
sendColor=(e,value)=>{
  console.log("send color");
  this.props.SetColor(value);
}
   
    render(){
      const colors = [ ' #d7aefb', '#a7ffeb', '#e8eaed', 
      '#aecbfa', '#e6c9a8', '#fdcfe8', '#f28b82', '#aecbfa'];
        return(
            <>
        <div className="inlineicons">
            <AddAlertOutlinedIcon />
            < PersonAddOutlinedIcon />
            <ColorLensOutlinedIcon onClick={this.changeShow}  />
            <AddPhotoAlternateOutlinedIcon />
            < ArchiveOutlinedIcon   onClick={()=>this.archieveNote(this.props.Notes)} ></ ArchiveOutlinedIcon>
           <MoreVertOutlinedIcon onClick={(e)=>this.handleClick(e)} />
           { this.state.show ? <div className="colorbox" >
                    {colors.map((value) => {
                        return (<><div className="colorsmall" onClick={(e)=>this.updateNote(e,value,this.props.Notes)} style={{ backgroundColor: value }}></div></>)
                    })}

                </div>:null}
                
           <Menu
        id="simple-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
      >
        <MenuItem onClick={(e)=>this.deleteNote(e,this.props.Notes)}>Delete Note</MenuItem>
        <MenuItem onClick={this.handleClose}>Add Label</MenuItem>
        <MenuItem onClick={this.handleClose}>Add drawing</MenuItem>
        <MenuItem onClick={this.handleClose}>Make a copy</MenuItem>
        <MenuItem onClick={this.handleClose}>Show checkboxes</MenuItem>
        

      </Menu>
        </div> 
        </>
      )
    }
}