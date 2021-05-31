import React from 'react';
import './Registration.css'
import logo from '../../assets/googleimg.svg'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

 class Registration extends React.Component {
  
    render() {
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
                                <TextField id="outlined-basic" className="fn" variant="outlined" name="firstname"
                                 label="First name" size="small" margin="dense"  />

                                <TextField id="outlined-basic" className="fn space" variant="outlined" name="lastname"
                                 label="Last name" size="small" margin="dense" />
                            </div>
                                <div>
                                    <TextField id="outlined-basic" variant="outlined" name="username" 
                                    label="Username" size="small" margin="dense"  />  <br />
                                </div>
                                <div className="inline">
                                    <TextField id="outlined-basic" className="fn"  variant="outlined" name="password" onChange={this.handleChange}
                                    label="Password" size="small" margin="dense" />

                                    <TextField id="outlined-basic" className="fn space"  variant="outlined" name="confirmpassword" onChange={this.handleChange}
                                     label="Confirm Password" size="small" margin="dense" />
                                </div>
                                <span>Use 8 or more characters with a mix of letters, numbers & symbols</span>

                                <div>
                                    <input type="checkbox" id="radio"  value="Show password" />
                                    <label htmlFor="radio"> Show password</label>
                                </div>
                                <div className="inline__buttons">
                                    < Button variant="outlined" size="small"  >Next</Button>
                                </div>
                            </div>
                        </div>
                        <div className="logo">
                            <img src={logo} alt="" />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default  Registration;