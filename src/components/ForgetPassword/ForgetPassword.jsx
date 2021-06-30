import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import service from '../../services/userService';
import { BrowserRouter as Router, Route, Link, Navlink, Switch } from 'react-router-dom';
import '../registration/Registration.scss';
import  './ForgetPassword.scss';

export default class ForgetPassword extends React.Component {
    constructor(probs) {
        super(probs);
        this.state = {
            username: ""
        }
    }

    submit = () => {
        let data = {
            email: this.state.username,
        }
        service.forgetpassword(data).then((result) => {
          
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })
    }

    handleChange = (e) => {
        this.setState({ username: e.target.value })
    }

    render() {
        return (
            <><div className="fget-frame">
                <div className="fget-form">
                    <div className="fget-cont">
                    <div className="login-fundoo">
                            <span className="f">F</span>
                            <span className="u">u</span>
                            <span className="n">n</span>
                            <span className="d">d</span>
                            <span className="o">o</span>
                            <span className="u">o</span>
                        </div>
                        <p className="login-fundoo-account"> Account Recovery </p>
                        <div>Enter your username for retrieve your password</div>
                        <div className="textfields">   
                         <TextField id="outlined-basic" className="asdf" variant="outlined" name="username"
                            label="Email or phone " size="small"  margin="dense" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="div-but-content">
                       <Link to="/"  className="Text Text-Cont">Try another way</Link>                          
                        <Button className="button" variant="contained" color="primary" href="#contained-buttons" onClick={this.submit}>
                                        Submit
                                     </Button>
                    </div>
                </div>
            </div>
     </>
     ) }
}