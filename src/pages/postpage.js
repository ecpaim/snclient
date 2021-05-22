import React from 'react';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import SideBar from '../components/sideBar';
import { Typography } from '@material-ui/core';
import axios from 'axios';

import {connect} from 'react-redux';
import { addCurrentPost } from  '../redux/user/userSlice';

const styles = (theme) => ({ 
    ...theme.general,
  });

function PostPage({username,  classes, currentPost, addCurrentPost}){

    const {userid, timeid} = useParams();

    React.useEffect(()=> {
        let params = { id: userid + '#' +  timeid };
        axios.post('/api/pstncomm', params)
            .then(res => {
                console.log('param: '+params.id);
                addCurrentPost({ pst: res.data.pop()});
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <Grid container className={classes.background} >
            <Grid item md={3} xs={false} />
            <Grid item md={4} xs={12} >
                {currentPost === {} ? <Typography> loading</Typography> : <Typography> {currentPost.id}</Typography> }
               
               
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

const mapActionsToProps = { addCurrentPost };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostPage));