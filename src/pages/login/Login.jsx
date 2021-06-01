import React from 'react'
import '../login/Login.css'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import UserService from "../../service/Userservice";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const service = new UserService();

class Login extends React.Component {
    constructor(probs) {
        super(probs);
        this.state = {
            "username": "",
            "password": "",
            "usernameError": false,
            "usernameMsg": "",
            "passwordError": false,
            "passwordErrorMsg": "",
            "showpassword": true,
            "show": false,
            "snackmsg": ""

        }

    }
  
    handlechange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value })
    }
    validationCheck = () => {
        this.setState({
            usernameError: false,
            usernameErrorMsg: '',
            passwordError: false,
            passwordErrorMsg: '',
        })
        var valid = true;

        let patter = "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
        let pattern = new RegExp(patter);
        if (!pattern.test(this.state.username)) {
            this.setState({ usernameError: true })
            this.setState({ usernameErrorMsg: "Invalid Gmail address" })
            valid = false;
        }
        if (this.state.username.length == 0) {
            this.setState({ usernameError: true })
            this.setState({ usernameErrorMsg: "Choose Gmail address" })
            valid = false;
        }

        if (this.state.password.length < 8) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrorMsg: "password should be atleast 8 characters" })
            valid = false;
        }

        if (this.state.password.length == 0) {
            this.setState({ passwordError: true })
            this.setState({ passwordErrorMsg: "Enter a password" })
            valid = false;
        }

        return valid;

    }
    handleClick = (e) => {
        this.setState({ showpassword: !this.state.showpassword })

    }
    submit = () => {

        if (this.validationCheck()) {
            let data = {
                "email": this.state.username,
                "password": this.state.password,
                "server": "advance"
            }
            service.login(data).then((result) => {
                localStorage.setItem('Token', result.data.id);
                localStorage.setItem('FirstName', result.data.firstName);
                localStorage.setItem('LastName', result.data.lastName);
                localStorage.setItem('Email', result.data.email);

                localStorage.setItem('userDetails', JSON.stringify(result.data))
                console.log(result.data.id)
                this.setState({ snackmsg: "Login sucess" })
                this.setState({ show: true })

            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            this.setState({ snackmsg: "Please Enter Valid details" })
            this.setState({ show: true })
        }
    }
    render() {
        return (
            <>
                <div className="fullbody">
                    <div className="loginbody">
                        <div className="topcontent">
                            <div className="google">
                                <span id="f">F</span><span id="u">u</span><span id="n">n</span>
                                <span id="d">d</span><span id="o">oo</span>
                            </div>
                            <p className="fonty" > Sign in</p>
                            <div >  Use your fundoo Account </div>

                            <div className="textfields">
                                <TextField id="outlined-basic" error={this.state.usernameError} helperText={this.state.usernameErrorMsg} className="TFwidth" variant="outlined" name="username"
                                    label="Email or phone " size="small" onChange={this.handlechange} margin="dense" />

                                <TextField id="outlined-basic" type={this.state.showpassword ? "password" : "type"} error={this.state.passwordError} helperText={this.state.passwordErrorMsg} variant="outlined" className="TFwidth" name="password"
                                    label="Password" size="small" margin="dense" onChange={this.handlechange} />
                                <div className="pas">
                                    <input type="checkbox" id="radio" onClick={this.handleClick} value="Show password" />
                                    <label htmlFor="radio"> Show password</label>
                                </div>
                                <div className="forget"> <a href="#"><Link to="#">Forget-Password</Link></a></div>
                            </div>
                        </div>

                        <div className="inline__button">
                            <Link to="/">Create Account</Link>
                            < Button variant="outlined" size="small" onClick={this.submit}>Sign in</Button>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default Login;