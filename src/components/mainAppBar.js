import React from 'react';

import icon from '../resources/base_transparent_eyes.svg';
import logo from '../resources/figario_amaranth.svg';

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Toolbar, AppBar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = (theme) => ({ 
    ...theme.general,

    logo:{
        marginLeft:10
    },
    toolbar:{ // overrides default height of 64
        minHeight:52,
        paddingRight:5
    },
    badge:{ // sets brigther version of secondary color
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.light,
    },
    icon:{
        padding:6
    },
    activeIcon:{ // sets brigther version of secondary color
        color: theme.palette.secondary.light
    },
    sectionDesktop: {
        display: 'none',
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
//<img src={logo} height='30' className={classes.logo} alt="logo" />
const MainAppBar = ({classes}) => {
    return(
        <div>
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <img src={icon} height='20' padding="0" alt="icon" />
                    <img src={logo} height='30' className={classes.logo} alt="logo" />

                    <div className={classes.grow} />

                    <div className={classes.sectionMobile}>
                    <IconButton aria-label="show 4 new mails" color="inherit" size='small' className={classes.icon}>
                        <Badge badgeContent={4} classes={{badge: classes.badge}} variant='dot'>
                            <NotificationsIcon className={classes.activeIcon} />
                        </Badge>
                    </IconButton>

                    <IconButton aria-label="show 4 new mails" color="inherit" size='small' className={classes.icon}>
                        <Badge badgeContent={0} classes={{badge: classes.badge}} variant='dot'>
                            <MailIcon />
                        </Badge>
                    </IconButton>

                    <IconButton aria-label="show 4 new mails" color="inherit" size='small' className={classes.icon}>
                            <AccountCircle />       
                    </IconButton>
                    </div>

                    <div className={classes.sectionDesktop}>
                    <IconButton aria-label="show 4 new mails" color="inherit" >
                        <Badge badgeContent={4} classes={{badge: classes.badge}} variant='dot'>
                            <NotificationsIcon className={classes.activeIcon} />
                        </Badge>
                    </IconButton>

                    <IconButton aria-label="show 4 new mails" color="inherit" >
                        <Badge badgeContent={0} classes={{badge: classes.badge}} variant='dot'>
                            <MailIcon />
                        </Badge>
                    </IconButton>

                    <IconButton aria-label="show 4 new mails" color="inherit" >
                            <AccountCircle />       
                    </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

MainAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainAppBar);