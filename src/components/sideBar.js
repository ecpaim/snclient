import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import SearchIcon from '@material-ui/icons/Search';

import {connect} from 'react-redux';

import CssTextField from '../util/cssTextField';

const styles = (theme) => ({
    ...theme.general,
    pst:{
        maxWidth:'50%',
        backgroundColor:'#ffffff',
        margin:6,
        marginLeft:0,
        padding:10,
        border: '1px solid rgba(0,0,0,0.1)',   
    },
    pstButtons:{
        display:'flex',
        marginLeft: 10,
        marginRight:400,
        marginBottom:8,
    },
    usernameText:{
        fontSize:14,
        padding:2,
        paddingTop:6
    },
    usernameIcon:{
        display:'flex',
        marginLeft: 6,
        marginRight:400,
        marginBottom:8,
    },
    buttonsText:{
        marginLeft:8,
        marginTop:2
    },
    searchBar:{
        fontSize: 14
    }
});

const SideBar = ({username,email,classes}) => {
    return(
        <div style={{position:'fixed'}}>
        <div className={classes.pst}>
            <CssTextField
                id='searchbar'
                placeholder='Pesquisar'
                fullWidth
                variant='outlined'
                size='small'
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon  style={{color:'rgba(0,0,0,0.33)', fontSize:20}} />
                      </InputAdornment>
                    ),
                    classes: {
                        input: classes.searchBar
                    }
                  }}
                
                />
        </div>
        <div className={classes.pst}>
           
            <div className={classes.usernameIcon}>
                <IconButton aria-label="user photo" color="inherit" size='small' >
                    <AccountCircle style={{fontSize:34}}/>
                </IconButton>
                <div className={classes.usernameText}> <b> {username} </b> </div>

            </div>

            <div className={classes.pstButtons}>
                <IconButton aria-label="user photo" color="inherit" size='small' >
                    <EditIcon style={{fontSize:20}}/>
                </IconButton>

                <Typography className={classes.buttonsText} variant='body2'> Perfil </Typography>

                <div className={classes.grow} />
                
            </div>
            <div className={classes.pstButtons}>
                <IconButton aria-label="user photo" color="inherit" size='small' >
                    <AccountCircle style={{fontSize:20}}/>
                </IconButton>

                <Typography className={classes.buttonsText} variant='body2'> Seguidores </Typography>

                <div className={classes.grow} />
                
            </div>
            <div className={classes.pstButtons}>
                <IconButton aria-label="user photo" color="inherit" size='small' >
                    <AccountCircle style={{fontSize:20}}/>
                </IconButton>

                <Typography className={classes.buttonsText} variant='body2'> Seguindo </Typography>

                <div className={classes.grow} />
                
            </div>
            <div className={classes.pstButtons}>
                <IconButton aria-label="user photo" color="inherit" size='small' >
                    <GroupWorkIcon style={{fontSize:20}}/>
                </IconButton>

                <Typography className={classes.buttonsText} variant='body2'> Grupos </Typography>

                <div className={classes.grow} />
                
            </div>
            <div className={classes.pstButtons}>

                <IconButton aria-label="user photo" color="inherit" size='small' >
                    <SettingsIcon style={{fontSize:20}}/>
                </IconButton>

                <Typography className={classes.buttonsText} variant='body2'> Configurações </Typography>

                <div className={classes.grow} />

            
                
            </div>
        </div>
        </div>
    );
};

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    username: state.user.username,
    email: state.user.email
});

export default connect(mapStateToProps)(withStyles(styles)(SideBar));
