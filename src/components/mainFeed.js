
import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import blankPst from '../resources/blank_4_5.svg';

import {connect} from 'react-redux';

const styles = (theme) => ({
    ...theme.general,
    pst:{
        backgroundColor:'#ffffff',
        margin:6,
        [theme.breakpoints.up('md')]: {
            padding:10,
            border: '1px solid rgba(0,0,0,0.1)',
        }
    },
    pstImg:{
        width:'100%',
        [theme.breakpoints.up('md')]: {
            width:'90%',
            paddingLeft:'5%',
            paddingRight:'5%',
            paddingBottom:10,
            paddingTop:10
        }
    },
    pstButtons:{
        display:'flex',
        /*
        width:'95%',
        paddingLeft:'2.5%',
        paddingRight:'2.5%'
        */
       paddingLeft: 3,
       paddingRight: 3
    },
    pstIcons:{
        fontSize: 28,
        padding:3,
        [theme.breakpoints.up('md')]: {
            fontSize: 20,
        }
    },
    favouriteIcon:{
        fontSize: 34,
        [theme.breakpoints.up('md')]: {
            fontSize: 24,
        }
    },
    pstUser:{
        fontSize:36,
        paddingBottom:3,
        paddingTop:3
    },
    usernameText:{
        fontSize:14,
        padding:2,
        paddingTop:10
    },
    feedText:{
        fontSize:13,
        padding:2,
        paddingTop:11,
        paddingRight:10,
        color:'rgba(0,0,0,0.4)'
    }
});

const posts = [1,2,3,4,5];



const MainFeed = ({username, authenticated, classes}) => {
    return(
        <div>
            {
                posts.map( pst => (
                    <div className={classes.pst} key={pst}>
                        <div className={classes.pstButtons}>
                            <IconButton aria-label="user photo" color="inherit" size='small' >
                                    <AccountCircle className={classes.pstUser} />
                            </IconButton>
                            <div className={classes.usernameText}> <b> {username} </b> </div>

                            <div className={classes.grow} />

                            <div className={classes.feedText}>  feed: geral  </div>
                               
                        </div>

                        <img src={blankPst} className={classes.pstImg} alt='post'/>

                        <div className={classes.pstButtons}>
                            <IconButton aria-label="like post" color="inherit" size='small'>
                                <FavoriteBorderIcon className={classes.favouriteIcon}/> 
                            </IconButton>
                            <IconButton aria-label="comment on post" color="inherit" size='small' >
                                <ModeCommentOutlinedIcon className={classes.pstIcons}/>
                            </IconButton>
                            <div className={classes.grow} />
                            <IconButton aria-label="share post outside figario" color="inherit" size='small' >
                                <ShareOutlinedIcon className={classes.pstIcons}/>
                            </IconButton>
                        </div>
                      
                    </div>
                ))
            }
        </div>
    );
};

MainFeed.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    username: state.user.username,
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(withStyles(styles)(MainFeed));