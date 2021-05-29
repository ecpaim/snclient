import React from 'react';

//import icon from '../resources/base_transparent_eyes.svg';
import icon from '../resources/optmized_icon.svg';
//import logo from '../resources/figario_amaranth.svg';
import logo from '../resources/figario_purple.svg';
import fallbackImg from '../resources/blank_4_5.png';

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Toolbar, AppBar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import {connect} from 'react-redux';

import {Link as RouterLink} from "react-router-dom";

import axios from 'axios';


const styles = (theme) => ({ 
    ...theme.general,
    appbar:{
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        [theme.breakpoints.up('md')]: {
            paddingRight:'25%',
            paddingLeft:'24%'
          },
    },
    circleImg:{
        height:25,
        width:25,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    icon:{
        marginBottom:6
    },
    logo:{
        marginLeft:8,
        marginTop:2
    },
    toolbar:{ // overrides default height of 64
        minHeight:52,
        paddingRight:5
    },
    badge:{ // sets brigther version of secondary color
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.light,
        fontSize: 9,
        height:15,
        width:15,
        minWidth:15
    },
    MobileIconButton:{
        padding: 8
    },
    inactiveIcon:{
        color:'rgba(0,0,0,0.4)',
        fontSize: 20
    },
    activeIcon:{ // sets brigther version of secondary color
        color: theme.palette.secondary.light,
        fontSize: 20
    },
    sectionDesktop: {
        display: 'none',
        marginRight:5,
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
    Buttons: { 
        border:0,
        margin:5,
        marginRight:0,
        minWidth:42 // overrides default width of 64px
    },
    popoverItens:{
        textTransform:'none',
        padding:8,
        paddingRight:12,
        paddingLeft:12,
        marginRight:7,
        marginLeft:7
    },
    commentMessageIcon:{
        paddingLeft: 10,
        fontSize: 16
    },
    notificationMessageIcon: {
        color: '#cc0000', // red
        paddingLeft: 10,
        fontSize: 16
    },
    notificationMessageIconHidden: {
        color: theme.palette.secondary.main, // purple
        paddingLeft: 10,
        fontSize: 16
    },
    popoverOffset: {
        marginTop:10
    }
});

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    let trigger = useScrollTrigger({ target: window ? window() : undefined });

    if(useMediaQuery('(min-width:900px)')){ // does not hide bar in desktop view
        trigger = false;
    };
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

const MINUTE = 600000;

const MainAppBar = ({profilePic, classes}) => {

    const [anchorEl, setAnchorEl] = React.useState({ notif: null, messages: null });
    const [notifications, setNotifications] = React.useState([]);
    const [newNotif, setNewNotif] = React.useState(0);
    const [newMessages, setNewMessages] = React.useState(0);
    const notif = Boolean(anchorEl.notif);

    const messages = Boolean(anchorEl.messages);

    React.useEffect(() => {
        const interval = setInterval(() => { console.log('10min')}, MINUTE);
        axios.get('/api/notif')
            .then((res) => {
                console.log(res.data);
                let newNotifications = 0;
                res.data.forEach((notif) => { if(!notif.read) {newNotifications++;} return; });
                setNotifications(res.data);
                setNewNotif(newNotifications);
            })
            .catch(err => console.log(err));

        return () => clearInterval(interval); //return unmount function to prevent memory leaks
    }, []);

    const handleClick = (event, id) => {
        let newAnchors = {...anchorEl};
        if( id === 'notif'){
            if(newAnchors.notif){
                newAnchors.notif = null;
            } else {
                newAnchors.notif = event.currentTarget;
                notifications.forEach((notif) => { 
                    if(notif.read === false){
                        axios.post('/api/readNotif', {id: notif.id})
                        .then( res => {console.log(res); setNewNotif(0);})
                        .catch(err => console.log(err)) 
                    }
                    return;
                });
            }
        }
        else{
            newAnchors.messages ? newAnchors.messages = null : newAnchors.messages = event.currentTarget
        }
        setAnchorEl(newAnchors);
    };
    
    const handleClose = (id) => {
        let newAnchors = {...anchorEl};
        id === 'notif' ? newAnchors.notif = null : newAnchors.messages = null;
        setAnchorEl(newAnchors);
    };

    return(
        <div>
            <HideOnScroll {...classes}>
            <AppBar elevation={0} className={classes.appbar} >
                <Toolbar className={classes.toolbar}>

                        
                    
                    <Link component={RouterLink} to='/'>
                        <img src={icon} height='20'  className={classes.icon} alt="icon" />
                        <img src={logo} height='30' className={classes.logo} alt="logo" />
                    </Link>
                    
                    <div className={classes.grow} />

                    <div className={classes.sectionMobile}>
                    <IconButton aria-label="show notifications" color="inherit" size='small' className={classes.MobileIconButton} onClick = {(e) => handleClick(e, 'notif')}>
                        {newNotif === 0 ? 
                            <Badge badgeContent={0} classes={{badge: classes.badge}} >
                                <NotificationsIcon className={classes.inactiveIcon} />
                            </Badge>
                            : 
                            <Badge badgeContent={newNotif} classes={{badge: classes.badge}} >
                                <NotificationsIcon className={classes.activeIcon} />
                            </Badge>
                        }
                    </IconButton>

                    <IconButton aria-label="show messages" color="inherit" size='small' className={classes.MobileIconButton}>
                        { newMessages === 0 ?
                            <Badge badgeContent={0} classes={{badge: classes.badge}} >
                                <MailIcon className={classes.inactiveIcon}/>
                            </Badge>
                            :
                            <Badge badgeContent={newMessages} classes={{badge: classes.badge}} >
                                <MailIcon className={classes.activeIcon}/>
                            </Badge>
                        }
                    </IconButton>

                    <IconButton aria-label="show profile and configurations" color="inherit" size='small' className={classes.MobileIconButton}>
                        {profilePic !== '' ? 
                                <img src={profilePic} className={classes.circleImg} alt='profile picture' />
                            : <img src={fallbackImg} className={classes.circleImg} alt='profile picture' /> }   
                    </IconButton>
                    </div>

                    <div className={classes.sectionDesktop}>
                  
                    <ToggleButton selected={notif} disableRipple className={classes.Buttons} aria-label="show notifications" size='small' onClick = {(e) => handleClick(e, 'notif')} >
                        {newNotif === 0 ? 
                        <Badge badgeContent={0} classes={{badge: classes.badge}} >
                            <NotificationsIcon className={classes.inactiveIcon} />
                        </Badge>
                        : 
                        <Badge badgeContent={newNotif} classes={{badge: classes.badge}} >
                            <NotificationsIcon className={classes.activeIcon} />
                        </Badge>
                        }
                    </ToggleButton>
                    

                    <Popper open={notif} anchorEl={anchorEl.notif} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom' }}
                            >
                            <Paper className={classes.popoverOffset}>
                               
                                <MenuList  id="menu-list-grow" >
                                    {notifications.length > 0 ? notifications.map( (n) => {
                                        if( n.type === 'LIKE' && n.hidden === false){
                                            return (<div>
                                                <MenuItem disableRipple className={classes.popoverItens} size='small' > 
                                                    <Typography variant='body2'>   <b>{n.from}</b> reagiu ao seu post </Typography> 
                                                    <div className={classes.grow} />
                                                       <FavoriteIcon className={classes.notificationMessageIcon}/>
                                                </MenuItem>
                                            </div>);
                                        } else if( n.type === 'LIKE' && n.hidden === true) {
                                            return (<div>
                                                <MenuItem disableRipple className={classes.popoverItens} size='small' > 
                                                    <Typography variant='body2'>alguém reagiu ao seu post </Typography> 
                                                    <div className={classes.grow} />
                                                    <FavoriteIcon className={classes.notificationMessageIconHidden} />
                                                </MenuItem>
                                            </div>);
                                        } else if( n.type === 'COMMENT' && n.hidden === false) {
                                            return (<div>
                                                <MenuItem disableRipple className={classes.popoverItens} size='small' > 
                                                    <Typography variant='body2'><b>{n.from}</b> comentou em seu post </Typography> 
                                                    <div className={classes.grow} />
                                                    <ModeCommentOutlinedIcon className={classes.commentMessageIcon} />
                                                </MenuItem>
                                            </div>);
                                        } else if( n.type === 'COMMENT' && n.hidden === true) {
                                            return (<div>
                                                <MenuItem disableRipple className={classes.popoverItens} size='small' > 
                                                    <Typography variant='body2'>alguém comentou seu post </Typography> 
                                                    <div className={classes.grow} />
                                                    <ModeCommentOutlinedIcon className={classes.commentMessageIcon} />
                                                </MenuItem>
                                            </div>);
                                        } 
                                        
                                    }) 
                                        : <MenuItem disableRipple className={classes.popoverItens} size='small' > 
                                            <Typography variant='body2'>não há notificações novas! </Typography> 
                                            </MenuItem>}
                                </MenuList>
                                
                            </Paper>
                            </Grow>
                        )}
                    </Popper>

                    <Button disableRipple className={classes.Buttons} aria-label="show messages" size='small' color="inherit" >
                        { newMessages === 0 ?
                            <Badge badgeContent={0} classes={{badge: classes.badge}} >
                                <MailIcon className={classes.inactiveIcon}/>
                            </Badge>
                            :
                            <Badge badgeContent={newMessages} classes={{badge: classes.badge}} >
                                <MailIcon className={classes.activeIcon}/>
                            </Badge>
                        }
                    </Button>

                    <Button disableRipple className={classes.Buttons} aria-label="show profile" size='small' color="inherit" >
                        {profilePic !== '' ? 
                                <img src={profilePic} className={classes.circleImg} alt='profile picture' />
                            : <img src={fallbackImg} className={classes.circleImg} alt='profile picture' /> }   
                    </Button>
                    </div>
                </Toolbar>
            </AppBar>
            </HideOnScroll>
        </div>
    );
};

MainAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profilePic: state.user.profilePic
});

export default connect(mapStateToProps)(withStyles(styles)(MainAppBar));