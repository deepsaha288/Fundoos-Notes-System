import React from 'react';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '390px',
        marginTop: '450px',
        maxHeight: '200px',
        marginLeft: '330px',
        borderRadius: '3px',
        backgroundColor: 'white',
        overflow: 'scroll',
        // padding: '0px 14px 0px 14px',
    },
    pop: {
        zIndex: "10000",
        width: '100 %',
        height: '100 %',
        position: 'fixed',
        top: '-90px',
        left: '-135px',
        display: 'flex',
        justifyContent: 'center',
    alignItems: 'center',
    }
  }));
export default function CollabPoper(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const list = (val) => {
        return (
            <div style={{
                height: '35px',
                cursor: 'pointer',
                padding: '6px',
                '&:hover': {
                    backgroundColor: 'grey'
                }
            }}
                onClick={() => {
                    props.collabAdd(val);
                }}>
                {val.email}
            </div>
       )
    }

    return (
        <>
            <Popper className={classes.pop} open={props.open} anchorEl={anchorEl} placement={'top-start'} transition>
                <div className={classes.paper} >{props.List.map(list)}</div>
            </Popper>
        </>
    );
}

