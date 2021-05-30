import React from 'react';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import {connect} from 'react-redux';

import NewComment from '../components/newComment';
import SideBar from '../components/sideBar';
import { addCurrentPost, addComment } from  '../redux/user/userSlice';
import fallbackImg from '../resources/blank_4_5.png';
import loadingCat from '../resources/loadingIcon.svg';
import Post from '../components/post';

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
    comments:{
        backgroundColor:'#ffffff',
        margin:6,
        [theme.breakpoints.up('md')]: {
            padding:10,
            border: '1px solid rgba(0,0,0,0.1)',
        }
    },
    profilePicButton:{
        padding:0,
        marginRight:5,
        marginTop:6,
        marginBottom:8,
    },
    pstButtons:{
        display:'flex',
        paddingLeft: 3,
        paddingRight: 3,
    },
    circleImg:{
        fontSize:10,
        height:38,
        width:38,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    pstUsernameText:{
        fontSize:14,
        padding:2,
        paddingTop:6
    },
    commentDescription:{
        fontSize:14,
        padding:2,
        wordWrap: "break-word",
        color:'rgba(0,0,0,0.8)'
        
    },
    overflow:{
        width:'70%'
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginTop:10,
        marginBottom:10
    },

  });

function PostPage({username,  classes, currentPost, addCurrentPost, addComment}){

    const {userid, timeid} = useParams();

    React.useEffect(()=> {
        let params = { id: userid + '#' +  timeid };
        axios.post('/api/pstncomm', params)
            .then(res => {
                console.log('param: ');
                console.log(res.data);
                addCurrentPost({ pst: res.data.post, comments:res.data.comments, likes: res.data.likes});
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <Grid container className={classes.background} >
            <Grid item md={3} xs={false} />
            <Grid item md={4} xs={12} >
                {currentPost === {} ? <img src={loadingCat} style={{width:'50%'}} alt='loading'/> 
                : <div>
                    <Post key={currentPost.id} post={currentPost}/>
                    <div className={classes.comments}>
                        <NewComment postId ={currentPost.id} />
                        { currentPost.comments && currentPost.comments.length > 0 ? 
                            <div >
                                {currentPost.comments.map( (comment) => (
                                    <div>
                                        <div className={classes.visibleSeparator} />
                                        <div className={classes.pstButtons}>
                                            <div>
                                            <IconButton aria-label="user photo" color="inherit" size='small' 
                                                className={classes.profilePicButton}>
                                                {comment.profilePic !== '' ? 
                                                        <img src={comment.profilePic} className={classes.circleImg} alt='profile' />
                                                    : <img src={fallbackImg} className={classes.circleImg} alt='profile' /> }
                                            </IconButton>
                                            </div>
                                            <div className={classes.overflow}>
                                                <Typography className={classes.pstUsernameText}> <b> {comment.username} </b> </Typography>
                                            
                                                <Typography className={classes.commentDescription}> {comment.comment} </Typography> 
                                                
                                            </div>
                                            <div className={classes.grow} />
                
                                            <Typography className={classes.commentDescription}> . </Typography>          
                                        </div>
                                    </div>
                                ))}
                            </div>
                        : null}
                    </div>
                </div> }
               
               
            </Grid>
            <Grid item md={2} xs={false} >
                <SideBar />
            </Grid>
      </Grid>
    );
};

PostPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    username: state.user.username,
    authenticated: state.user.authenticated,
    likes: state.user.likes,
    currentPost: state.user.currentPost
});

const mapActionsToProps = { addCurrentPost, addComment };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostPage));