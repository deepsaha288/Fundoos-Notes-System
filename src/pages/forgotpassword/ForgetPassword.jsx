import React from 'react'
import '../forgotpassword/ForgetPassword.css'
// import logo from '../../assets/googleimg.svg'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import UserService from "../../service/Userservice"
import Snackbar from '@material-ui/core/Snackbar';
import { BrowserRouter as  Link } from 'react-router-dom';


const service = new UserService();

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
        this.setState({ snackmsg: "valid email" })
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

    render() {
        return (
            <><div className="fullbody">
                <div className="loginbody">
                    <div className="topcontent">
                        <div className="google">  <span id="f">F</span><span id="u">u</span><span id="n">n</span>
                            <span id="d">d</span><span id="o">oo</span></div>
                        <p className="fonty"> Account Recovery </p>
                        <div>Enter your username for retrieve your password</div>
                        <div className="textfields">    <TextField id="outlined-basic" className="asdf" variant="outlined" name="username"
                            label="Email or phone " size="small"  margin="dense" onChange={this.handleChange} /></div>
                    </div>
                    <div className="inline___button">
                       <Link to="/">Try another way</Link>  
                        < Button variant="outlined" size="small" onClick={this.submit}>submit</Button>
                        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.state.show}
            autoHideDuration={1000}
            onClose={this.handleClose}
            message={this.state.snackmsg}
            action={
                <React.Fragment>
                </React.Fragment>}  />
                    </div>
                </div>
            </div>
     </>
     ) }
}
export default ForgetPassword;