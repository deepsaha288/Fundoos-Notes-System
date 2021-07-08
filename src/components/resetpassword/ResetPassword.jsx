import React from 'react'
import '../resetpassword/ResetPassword.scss'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import service from '../../services/userService';
import { BrowserRouter as Router, Link, useParams} from 'react-router-dom';

export default  function ResetPassword () {
 
    const [oldpassword,setoldpassword]=React.useState("");
    const [newpassword,setnewpassword]=React.useState("");


    function submit(){
  console.log(window.location.href.split("//"))
        let data = {

            "newPassword":newpassword,
            "confirmNewPassword":newpassword,


        }
        service.resetpassword(data).then((result) => {
            console.log(result);
            console.log("successfully change password")
        }).catch((error) => {
            console.log(error);

        })
    }
    
    const updatePassword = e =>{ setoldpassword(e.target.value);
    console.log(e.target.value);
    }
    const updateNewPassword = e => setnewpassword(e.target.value);
    
    let {token } = useParams();
    console.log(token);  

 
        return (
            <>
             
             <div className="fullbody">
                <div className="loginbody">
                    <div className="topcontent">
                        <div className="google">  <span id="f">F</span><span id="u">u</span><span id="n">n</span>
                            <span id="d">d</span><span id="o">oo</span></div>
                        <p className="font"> Reset Password </p>
                        <div className="textfield">   
                            <TextField id="outlined-basic" type="password" className="update-field" variant="outlined" name="password"
                            label="password" size="small"  margin="dense" onChange={updatePassword} />
                            <TextField id="outlined-basic"type="password" className="update-field" variant="outlined" name="confirmpassword"
                            label="confirm password" size="small" margin="dense" onChange={updateNewPassword} />
                            </div>
                    </div>
                    <div className="button">
                        <Link to="/">Back</Link>
                        < Button variant="outlined" size="small" onClick={submit}>submit</Button>
                        
                    </div>
                </div>
            </div>
            </>)
    }