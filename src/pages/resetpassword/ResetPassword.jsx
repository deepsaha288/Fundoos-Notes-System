import React from 'react'
import '../resetpassword/ResetPassword.css'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core'
import UserService from "../../service/Userservice"
import { BrowserRouter as Link,useParams} from 'react-router-dom';


const service = new UserService();

export default  function ResetPassword () {
 
    const [oldpassword,setoldpassword]=React.useState("");
    const [newpassword,setnewpassword]=React.useState("");


    function submit(){

        let data = {

            "newPassword":newpassword,
            "confirmNewPassword":newpassword,
            "token":token

        }
        service.resetpassword(data,token).then((result) => {
            console.log(result);
            console.log(token);
            console.log("successfully change password")
        }).catch((error) => {
            console.log(error);
            console.log(token);

        })
    }
    
    const updatePassword = e =>{ setoldpassword(e.target.value);
    console.log(e.target.value);
    }
    const updateNewPassword = e => setnewpassword(e.target.value);
    
    let { token } = useParams();
    console.log(token);
     
        return (
            <>
             
        <div className="fullbody">
                <div className="loginbody">
                    <div className="topcontent">
                        <div className="fonty">  <span id="f">F</span><span id="u">u</span><span id="n">n</span>
                            <span id="d">d</span><span id="o">oo</span></div>
                        <p className="fonty"> Reset Password </p>
                        <div className="textfield">   
                            <TextField id="outlined-basic" className="update-field" variant="outlined" name="password"
                            label="password" size="small"  margin="dense" onChange={updatePassword} />
                            <TextField id="outlined-basic" className="update-field" variant="outlined" name="confirmpassword"
                            label="confirm password" size="small" margin="dense" onChange={updateNewPassword} />
                            </div>
                    </div>
                    <div className="inline__button">
                        <Link to="/login">Back</Link>
                        < Button variant="outlined" size="small" onClick={submit}>submit</Button>
                    </div>
                </div>
            </div>
            </>)
    }