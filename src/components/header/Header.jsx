import React from 'react';
import clsx from 'clsx';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveRounded';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteForeverRounded';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import EditOutlinedIcon from '@material-ui/icons/EditRounded';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjectsRounded';
import service from '../../services/userService'; 
import './Header.scss'
import Createnotes from '../createNotes/Createnotes';
import Keep from '../../assests/keep.png'
import NoteBuilder from '../NoteBuilder/NoteBuilder';
import { useEffect } from 'react';
import Trash from '../../pages/trash/trash';
import Archive from '../../pages/archive/archive';
import { Route,Switch, Link} from "react-router-dom";
import Popover from './poppover';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },grow: {
    flexGrow: 1,
  },
  appBar: {
    borderBottom: '1px solid #BDBDBD',
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0px 0px 0px 0px !important',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,

    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    color: 'black',
    marginRight: 13,
  },

  drawer: {
    width: drawerWidth,

    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    border: '0px !important',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '20px',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {

    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: '30px',
    marginRight: '107px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    color: 'black',
    backgroundColor: '#F1F3F4',
    borderRadius: '8px',

    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '58%',
      height: '55px',
      marginLeft: '34px',
    },
  },
  searchIcon: {
    padding: theme.spacing(2, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(2, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '74ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  sideIcon:{
    borderRadius:'20px',
   
    "&:focus": {
      backgroundColor: '#FEEFC3',
      textDecoration:'none',
    }
  },sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [notes, setNotes] = React.useState([]);

  useEffect(() => {
    getNotes();
  },[]);

  const getNotes = () =>{
    service.getAllNotes().then((data) =>{
        console.log(data);
        setNotes(data.data.data.data);
             

    }).catch(error=>{
      console.log("error",error);
    })
}
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  function icon(index){
    switch (index) {
    case 0:
    return (<ListItemIcon > <EmojiObjectsIcon /> </ListItemIcon>)
    case 1:
    return (<ListItemIcon > <NotificationsNoneIcon /> </ListItemIcon>)
    case 2:
    return (<ListItemIcon > <EditOutlinedIcon /> </ListItemIcon>)
    case 3:
    return (<ListItemIcon > <ArchiveOutlinedIcon /> </ListItemIcon>)
    case 4:
    return (<ListItemIcon > <DeleteOutlinedIcon /> </ListItemIcon>)
    default:
    return (<ListItemIcon > <MailIcon /> </ListItemIcon>)
    }}


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="tool">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <img src={Keep} alt="" srcset="" />
          <Typography variant="h6" className="google">
                        <span id="f">F</span><span id="u">u</span><span id="n">n</span>
                        <span id="d">d</span><span id="o">oo</span>
         </Typography>


          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
              <Popover/>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
                <div className="avatar">
          <Avatar className="profilepic" alt="deep" src=" " />
          </div>
            </IconButton>
          </div>
        </Toolbar>

      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
          {['Notes', 'Reminder', 'Editlabels', 'Archive', 'Trash'].map((text, index) => (
           <Link style={{textDecoration:"none",color:"black"}} to={`/dashboard/${text}`} >
            <ListItem className={classes.sideIcon} button key={text}>
              {icon(index)}
              <ListItemText className={classes.sideIcon} primary={text} />
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
     
      <div className="create-part">
          <Switch>
									<Route className={classes.sideIcon}
									 exact path={"/dashboard"}
										component={NoteBuilder}
									>
                     <div className="create">
                    <Createnotes get={getNotes}/>
                    <NoteBuilder value={notes} get={getNotes}/>
                    </div>
                  </Route>
                  <Route className={classes.sideIcon}
									 exact path={"/dashboard/Notes"}
										component={NoteBuilder}
									>
                     <div className="create">
                    <Createnotes get={getNotes}/>
                    <NoteBuilder value={notes} get={getNotes}/>
                    </div>
                  </Route>
                  <Route className={classes.sideIcon}
									 exact path={"/dashboard/Reminder"}
										component={NoteBuilder}
									>
                     <div className="create">
                    <Createnotes get={getNotes}/>
                    <NoteBuilder value={notes} get={getNotes}/>
                    </div>
                  </Route>
                  <Route className={classes.sideIcon}
									 exact path={"/dashboard/Editlabels"}
										component={NoteBuilder}
									>
                     <div className="create">
                    <Createnotes get={getNotes}/>
                    <NoteBuilder value={notes} get={getNotes}/>
                    </div>
                  </Route>
                  <Route className={classes.sideIcon}
									 exact path={"/dashboard/Trash"}
										component={Trash}
									>
                    <div className="create"> 
                  <Trash value={notes} get={getNotes}/>
                  </div>
                  </Route>
                  <Route className={classes.sideIcon}
									 exact path={"/dashboard/Archive"}
										component={Archive}> 
                    <div className="create"> 
                  <Archive value={notes} get={getNotes}/>
                  </div>
                  </Route>
                  
					</Switch>
      </div>
     
    </div>
  );
}
