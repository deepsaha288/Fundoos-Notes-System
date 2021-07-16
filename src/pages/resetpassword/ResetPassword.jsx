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
             <div className="reset-frame">
            <form className="reset-form">
               <div className="reset-cont">    
                   <div className="reset-fundoo">
                       <span className="f">F</span>
                       <span className="u">u</span>
                       <span className="n">n</span>
                       <span className="d">d</span>
                       <span className="o">o</span>
                       <span className="u">o</span>
                   </div >
                   <div className="reset">
                   <p>Reset-password</p>
                   </div>
                   <div className="textfield">   
                            <TextField id="outlined-basic" type="password" className="update-field" variant="outlined" name="password"
                            label="password" size="small"  margin="dense" onChange={updatePassword} />
                            <TextField id="outlined-basic"type="password" className="update-field" variant="outlined" name="confirmpassword"
                            label="confirm password" size="small" margin="dense" onChange={updateNewPassword} />
                            </div>
                    </div>
                    <div className="button">
                        {/* <Link to="/">Back</Link> */}
                        < Button variant="outlined" size="small" onClick={submit}>submit</Button>
                        
                   </div>
                   </form>
                   </div>
            </>)
    }