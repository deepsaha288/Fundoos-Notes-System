import React from 'react'
import '../ForgetPassword/ForgetPassword.scss'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import service from '../../services/userService';

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
            <div className="login-frame">
            <form className="login-form">
               <div className="login-cont">    
                   <div className="login-fundoo">
                       <span className="f">F</span>
                       <span className="u">u</span>
                       <span className="n">n</span>
                       <span className="d">d</span>
                       <span className="o">o</span>
                       <span className="u">o</span>
                   </div>
                    <div className="c">
                    <p className="foo"> Account Recovery </p>
                    <p className="h">Enter your username for retrieve your password</p>
                    </div>
                    <div className="texts">   
                     <TextField  id="outlined-basic"className="asdf" type="text" name="username" label="email or phone"
                     variant="outlined" onChange={this.handleChange} />
                    </div>
                    <div className="inline-button"> 
                        < Button variant="outlined" size="small" onClick={this.submit}>Next</Button>
                    </div>
            </div>
            </form>
            </div>
    
     ) }
}
export default ForgetPassword;