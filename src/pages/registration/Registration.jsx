import React from 'react';
import './Registration.css'
import logo from '../../assets/googleimg.svg'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserService from "../../service/Userservice"
import { BrowserRouter as Route, Link,Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Slide } from '@material-ui/core';

const service = new UserService();


class Registration extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpassword: "",
            firstnameError: "",
            lastnameError: "",
            usernameError: "",
            passwordError: "",
            confirmpasswordError: "",
            firstnameErrorMsg: "",
            lastnameErrorMsg: "",
            usernameErrorMsg: "you can use numbers,letters and periods",
            passwordErrorMsg: "",
            confirmpasswordErrorMsg: "",
            showpassword: true,
            show: false,
            snackmsg: ""
        };
    }
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value })
    }
    handleClick = (e) => {
        this.setState({ showpassword: !this.state.showpassword })

    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ show: false })
    };
    validationCheck = () => {
        this.setState({
            firstnameError: false,
            firstnameErrorMsg: '',
            lastnameError: false,
            lastnameErrorMsg: '',
            usernameError: false,
            usernameErrorMsg: '',
            passwordError: false,
            passwordErrorMsg: '',
            confirmpasswordError: false,
            confirmpasswordErrorMsg: ''
        })
        var valid = true;
        if (this.state.firstname.length === 0) {
            this.setState({ firstnameError: true,  firstnameErrorMsg: "Enter first name " })
            valid = false;
        }

        if (this.state.firstname.length === 0 && this.state.lastname.length === 0) {
            this.setState({ firstnameError: true, lastnameError: true,firstnameErrorMsg: "Enter first name, lastname" })
            valid = false;
        }


        let patter = "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
        let pattern = new RegExp(patter);
        if (!pattern.test(this.state.username)) {
            this.setState({ usernameError: true,usernameErrorMsg: "Invalid Gmail address"  })
            valid = false;
        }
        if (this.state.username.length === 0) {
            this.setState({ usernameError: true,usernameErrorMsg: "Choose Gmail address" })
            valid = false;
        }

        if (this.state.password.length !== 0 && this.state.password !== this.state.confirmpassword) {
            this.setState({ passwordError: true,passwordErrorMsg: "password didn't match "  })
            valid = false;
        }
        if (this.state.password.length < 8) {
            this.setState({ passwordError: true,passwordErrorMsg: "password should be atleast 8 characters"})
            valid = false;
        }

        if (this.state.password.length === 0) {
            this.setState({ passwordError: true,passwordErrorMsg: "Enter a password"})
            valid = false;
        }

        return valid;

    }

    submit = () => {

        if (this.validationCheck()) {

            let data = {
                "firstName": this.state.firstname,
                "lastName": this.state.lastname,
                "email": this.state.username,
                "service": "advance",
                "password": this.state.password
            }
            service.Registration(data).then((result) => {
                console.log(result);
                this.setState({ snackmsg: "Registered sucessfully",show: true }) 
                this.signinpage(); 
            }).catch((error) => {
                console.log(error);
            })

        }
        
        else {
            this.setState({ snackmsg: "Please enter valid input" ,show: true  })
        }

    }
    signinpage = () => {
        this.setState({ redirect: "/Login"});
      }

    render() {
        if (this.state.redirect)
        {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="body">
                <div className="accountbox">
                    <div className="innerbody">
                        <div className="form">
                            <div className="google">
                                <span id="f">F</span><span id="u">u</span><span id="n">n</span>
                                <span id="d">d</span><span id="o">oo</span>
                            </div>
                            <div className="create">Create your Fundoo Account</div>
                            <div className="inputs">                            <div className="inline">
                                <TextField id="outlined-basic" className="fn" variant="outlined" name="firstname" onChange={this.handleChange}
                                    error={this.state.firstnameError} label="First name" size="small" margin="dense" helperText={this.state.firstnameErrorMsg} />

                                <TextField id="outlined-basic" className="fn space" variant="outlined" name="lastname" onChange={this.handleChange}
                                    error={this.state.lastnameError} label="Last name" size="small" margin="dense" helperText={this.state.lastnameErrorMsg} />
                            </div>
                                <div>
                                    <TextField id="outlined-basic" variant="outlined" name="username" fullWidth onChange={this.handleChange}
                                        error={this.state.usernameError} label="Username" size="small" margin="dense" helperText={this.state.usernameErrorMsg} />  <br />
                                </div>
                                <div className="inline">
                                    <TextField id="outlined-basic" className="fn" type={this.state.showpassword ? "password" : "type"} variant="outlined" name="password" onChange={this.handleChange}
                                        error={this.state.passwordError} label="Password" size="small" margin="dense" helperText={this.state.passwordErrorMsg} />

                                    <TextField id="outlined-basic" className="fn space" type={this.state.showpassword ? "password" : "type"} variant="outlined" name="confirmpassword" onChange={this.handleChange}
                                        error={this.state.confirmpasswordError} label="Confirm Password" size="small" margin="dense" helperText={this.state.confirmpasswordErrorMsg} />
                                </div>
                                <span>Use 8 or more characters with a mix of letters, numbers & symbols</span>

                                <div>
                                    <input type="checkbox" id="radio" onClick={this.handleClick} value="Show password" />
                                    <label htmlFor="radio"> Show password</label>
                                </div>
                                <div className="inline__buttons">
                                    <Link to="/Login">Sign in instead</Link>
                                    < Button variant="outlined" size="small" onClick={this.submit}>Next</Button>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        TransitionComponent={Slide}
                                        open={this.state.show}
                                        autoHideDuration={1000}
                                        onClose={this.handleClose}
                                        message={this.state.snackmsg}
                                        action={
                                            <React.Fragment>

                                                <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </React.Fragment>} />
                                </div>
                            </div>
                        </div>
                        <div className="logo">
                            <img src={logo} alt="" />
                            <span>One account. All of Fundoo</span>
                            <snap>working for you.</snap> 
                        </div>
                    </div>  
                </div>
            </div>

        )
    }
}
export default Registration;