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
import ContextGetNote from '../context/Context'

const service = new UserService();

export default class Icon extends React.Component {
  static contextType = ContextGetNote
  constructor(props) {
    super(props);
    this.state = ({
      anchorEl: null,
      show: false,
      color: ""
    })

  }

  archieveNote = (value) => {
    console.log(value);
    const getnotes = this.context
    let data = {
      noteIdList: [value.id],
      isArchived: true,
    };

    let token = localStorage.getItem("Token");
    service.archieveNote(data, token)
      .then((data) => {
       console.log(data);
       console.log(getnotes)
        getnotes();
      })
      .catch((err) => {
        console.log("error = " + err);
      });
  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  changeShow = () => {
    this.setState({ show: !this.state.show })
  }
  getPhoto=(e,value)=>{
    console.log(e.target.file)
    let token = localStorage.getItem("Token");
    let data = {
      noteIdList: [value.id],
      file:e.target.files
    }
    console.log(data)
    service.updateNote(data, token).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    })
  }

  deleteNote = (e, value) => {
    const getnotes = this.context
    let token = localStorage.getItem('Token');
    console.log("hai object delete");
    let data = {
      isDeleted: true,
      noteIdList: [value.id]
     
    }
    service.deleteNote(data, token).then((result) => {
      this.handleClose();
      console.log(result);
      console.log(getnotes)
      getnotes();
    }).catch((err) => {
      console.log(err);
    })
  }
  colorItem= (e, colorValue, value) => {
    debugger;
    if(this.props.val !== "imgVal"){
    const getnotes = this.context
    let token = localStorage.getItem("Token");
    let data = {
      noteIdList: [value.id],
      color: colorValue,
    }

    service.colorChange(data, token).then((result) => {
      console.log(data);
      console.log(result);
      console.log(getnotes)
       getnotes();
       this. handleClose();
          this.setColor();
    }).catch((err) => {
      console.log(err);
    })
  }
  else{
    this.props.handleColor(colorValue);

  }
  }
  sendColor = (e, value) => {
    console.log("send color");
    this.props.SetColor(value);
  }

  render() {
    const colors = ['#ffffff','#f28b82','#fbbc04','#fff475','#ccff90','#cbf0f8', '#a7ffeb','#aecbfa','#d7aefb','#fdcfe8','#e6c9a8','#e8eaed'];
    return (
      <>
        <div className="inlineicons">
          <AddAlertOutlinedIcon />
          < PersonAddOutlinedIcon />
          <div>
          <ColorLensOutlinedIcon onClick={this.changeShow} />
          {this.state.show ? <div className="colorbox" >
            {colors.map((value) => {
              return (<><div className="colorsmall" onClick={(e) => this.colorItem(e, value, this.props.Notes)} style={{ backgroundColor: value }}></div></>)
            })}

          </div> : null}
          </div>
          <input type="file" ref={this.myfile} onChange={(e) => this.getPhoto(e,this.props.Notes)}/>
          <AddPhotoAlternateOutlinedIcon onclick={(e)=>this.photoUpdate()}></AddPhotoAlternateOutlinedIcon>
          < ArchiveOutlinedIcon onClick={() => this.archieveNote(this.props.Notes)} ></ ArchiveOutlinedIcon>
          <MoreVertOutlinedIcon onClick={(e) => this.handleClick(e)} />
  
          <Menu
               id="simple-menu"
              anchorEl={this.state.anchorEl}
               keepMounted
            open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
           >
            <MenuItem onClick={(e) => this.deleteNote(e, this.props.Notes)}>Delete Note</MenuItem>
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