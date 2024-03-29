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
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '@material-ui/core/Link';

import {connect} from 'react-redux';

import {Link as RouterLink} from "react-router-dom";


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

const MainAppBar = ({profilePic, classes}) => {
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
                    <IconButton aria-label="show notifications" color="inherit" size='small' className={classes.MobileIconButton}>
                        <Badge badgeContent={4} classes={{badge: classes.badge}} >
                            <NotificationsIcon className={classes.activeIcon} />
                        </Badge>
                    </IconButton>

                    <IconButton aria-label="show messages" color="inherit" size='small' className={classes.MobileIconButton}>
                        <Badge badgeContent={1} classes={{badge: classes.badge}} >
                            <MailIcon className={classes.activeIcon}/>
                        </Badge>
                    </IconButton>

                    <IconButton aria-label="show profile and configurations" color="inherit" size='small' className={classes.MobileIconButton}>
                        {profilePic !== '' ? 
                                <img src={profilePic} className={classes.circleImg} alt='profile picture' />
                            : <img src={fallbackImg} className={classes.circleImg} alt='profile picture' /> }   
                    </IconButton>
                    </div>

                    <div className={classes.sectionDesktop}>
                    <IconButton aria-label="show notifications" color="inherit" >
                        <Badge badgeContent={4} classes={{badge: classes.badge}} >
                            <NotificationsIcon className={classes.activeIcon} />
                        </Badge>
                    </IconButton>

                    <IconButton aria-label="show messages" color="inherit" >
                        <Badge badgeContent={1} classes={{badge: classes.badge}} >
                            <MailIcon className={classes.activeIcon} />
                        </Badge>
                    </IconButton>

                    <IconButton aria-label="show profile" color="inherit" >
                        {profilePic !== '' ? 
                                <img src={profilePic} className={classes.circleImg} alt='profile picture' />
                            : <img src={fallbackImg} className={classes.circleImg} alt='profile picture' /> }   
                    </IconButton>
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