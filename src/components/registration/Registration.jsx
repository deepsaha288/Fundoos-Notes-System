
import React from 'react'

const Registration = () =>{
    return(
        <div className="body">
        <div className="accountbox">
            <div className="innerbody">
                <div className="form">
                    <div className="google">
                        <span id="f">F</span><span id="o1">u</span><span id="o2">n</span>
                        <span id="d">d</span><span id="o3">oo</span>
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
                        <a href="#"> Use my current email address instead </a>
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
                            <Link to="/login">Sign in instead</Link>
                            < Button variant="outlined" size="small" onClick={this.submit} >Submit</Button>
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
                <div className="imgpart">
                    <img src={logo} alt="" />
                </div>
            </div>
        </div>
    </div>


    )
}

export default Registration;