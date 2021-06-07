import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';


export default class Snackbars extends React.Component {
    render() {
        return(
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.state.show}
            autoHideDuration={6000}
            onClose={this.handleClose}
            message={this.state.snackmsg}
            action={
                <React.Fragment>

           
                </React.Fragment>
                


            }
        />)
    }

}