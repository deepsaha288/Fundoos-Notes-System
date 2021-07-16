import React from 'react'
import '../ForgetPassword/ForgetPassword.scss'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import service from '../../services/userService';
import Snackbar from '@material-ui/core/Snackbar';
import { BrowserRouter as Router, Link} from 'react-router-dom';


class ForgetPassword extends React.Component {
    constructor(probs) {
        super(probs);
        this.state = {
            username: "",
            password: "",
            "show": false,
            "snackmsg": ""
        }
    }

    submit = () => {
        this.setState({ snackmsg: "reset password link successfully send your mail id " })
        this.setState({ show: true })
        let data = {
            "email": this.state.username,
        }
        service.forgetpassword(data).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    }

    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value })
    }
    handleClose = ( reason) =>{
        if (reason === 'clickaway') {
            return;
          }
      
          this.setState({open :false});

    }

    render() { 
        return (
            <div className="forgot-frame">
            <form className="forgot-form">
               <div className="forgot-cont">    
                   <div className="forgot-fundoo">
                       <span className="f">F</span>
                       <span className="u">u</span>
                       <span className="n">n</span>
                       <span className="d">d</span>
                       <span className="o">o</span>
                       <span className="u">o</span>
                   </div>
                    <div className="forgot-head">
                    <p className="display-msg"> Account Recovery </p>
                    <p className="forgot-msg">Enter your username for retrieve your password</p>
                    </div>
                    <div className="forgot-text">   
                     <TextField  id="outlined-basic"className="asdf" type="text" name="username" label="email or phone"
                     variant="outlined" onChange={this.handleChange} />
                    </div>
                  
                    <div className="forgot-button"> 
                        < Button variant="outlined" size="small" onClick={this.submit}>Next</Button>
                        <Snackbar
                    anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'left',
                  }}
            open={this.state.show}
            autoHideDuration={1000}
            onClose={this.handleClose}
            message={this.state.snackmsg}
            />
            </div>
            </div>
            </form>
            </div>
    
     ) }
}
export default ForgetPassword;