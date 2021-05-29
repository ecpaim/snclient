
import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from "react-router-dom";

import Post from './post';

import {connect} from 'react-redux';

import axios from 'axios';

import {addLike, removeLike } from  '../redux/user/userSlice';

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
});


const MINUTE = 600000;

const MainFeed = ({username, authenticated, likes, classes}) => {

    const [posts, setPosts] = React.useState([]);
   
    //const [likedPosts,setLikedPosts] = React.useState(initialLikes);

    React.useEffect(() => {
        const interval = setInterval(() => { console.log('10min')}, MINUTE);
        axios.get('/api/mainfeed')
            .then((res) => {
                console.log(res.data);
                setPosts(res.data); // refactor to call only if there are new posts
            })
            .catch(err => console.log(err));

        return () => clearInterval(interval); //return unmount function to prevent memory leaks
    }, []);

    return(
        <div>
            {
                posts ? posts.map( pst => (
                    <div key={pst.id}>
                    <Link component={RouterLink} to={pst.id}>
                        <Post  post={pst}/> 
                    </Link>  
                    </div>
                ))
                : null
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
    likes: state.user.likes
});


export default connect(mapStateToProps)(withStyles(styles)(MainFeed));