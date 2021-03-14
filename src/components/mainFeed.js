
import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import blankPst from '../resources/blank_4_5.svg';

import {connect} from 'react-redux';

import axios from 'axios';

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
       paddingLeft: 3,
       paddingRight: 3
    },
    pstButtonsText:{
        paddingTop:5
    },
    pstIcons:{
        fontSize: 28,
        padding:3,
        [theme.breakpoints.up('md')]: {
            fontSize: 20,
        }
    },
    favouriteIcon:{
        fontSize: 28,
        paddingLeft:1,
        [theme.breakpoints.up('md')]: {
            fontSize: 24,
        },

    },
    favouriteIconVisible:{
        color: '#cc0000', // red
        fontSize: 28,
        paddingLeft:1,
        [theme.breakpoints.up('md')]: {
            fontSize: 24,
        },

    },
    favouriteIconHidden:{
        color: theme.palette.secondary.main,
        fontSize: 28,
        paddingLeft:1,
        [theme.breakpoints.up('md')]: {
            fontSize: 24,
        },

    },
    flowerIcon:{
        fontSize: 20,
        paddingLeft:1,
        [theme.breakpoints.up('md')]: {
            fontSize: 18,
        },
    },
    pstUser:{
        fontSize:36,
        paddingBottom:3,
        paddingTop:3
    },
    pstDescription:{
        paddingLeft: 48,
        paddingRight: 48
    },
    pstUsernameText:{
        fontSize:14,
        padding:2,
        paddingTop:8
    },
    pstFeedText:{
        fontSize:13,
        padding:2,
        paddingTop:10,
        paddingRight:10,
        color:'rgba(0,0,0,0.4)'
    },
    likeMenu:{
        display:'flex'
    },
    likeOptions:{
        paddingTop:6,
        paddingBottom:6
    },
});

let initialLikes = {};
// axios.get('/api/likedposts')TODO

const MINUTE = 600000;

const MainFeed = ({username, authenticated, classes}) => {

    const [posts, setPosts] = React.useState([]);
    const [anchors, setAnchors] = React.useState({});
    const [likedPosts,setLikedPosts] = React.useState(initialLikes);

    React.useEffect(() => {
        const interval = setInterval(() => { console.log('10min')}, MINUTE);
        axios.get('/api/mainfeed')
            .then((res) => {
                console.log(res.data);
                let newAnchors = {};
                for( const pst of res.data){
                    newAnchors[pst.id] = {value: null, open: false};
                }
                console.log(newAnchors);
                setAnchors(newAnchors);

                setPosts(res.data); // refactor to call only if there are new posts
            })
            .catch(err => console.log(err));

        return () => clearInterval(interval); //return unmount function to prevent memory leaks
    }, []);

    const handleClick = (event, id) => {
        console.log(event);
        console.log(id);
        let newAnchors = {...anchors};
        newAnchors[id] = {value:event.currentTarget, open: Boolean(event.currentTarget)};
        setAnchors(newAnchors);
    };

    const handleClose = (id) => {
        let newAnchors = {...anchors};
        newAnchors[id] = {value:null, open: Boolean(null)};
        setAnchors(newAnchors);
    }

    const handleLike = (id, type, pstOwner) => {

        let newLikedPosts = {...likedPosts};
        newLikedPosts[id] = type;
        setLikedPosts(newLikedPosts);

        let newAnchors = {...anchors};
        newAnchors[id] = {value:null, open: Boolean(null)};
        setAnchors(newAnchors);

        const currentDate = new Date();
        
        const newLike = {
            type: 'LIKE',
            hidden: type === 'visible' ? false : true,
            timestamp: currentDate.getTime(),
            id: id,
            username: pstOwner
        };

        axios.post('/api/reactpost', newLike)
            .then((res) => {    
                console.log(res);
                
                let newPosts = posts.map( pst => {
                    if(pst.id === id){
                        pst.nLikes = pst.nLikes + 1;
                    }
                    return pst;
                });
                setPosts(newPosts);

            }).catch( err => {
                console.log(err);
                let newLikedPosts = {...likedPosts};
                newLikedPosts[id] = undefined;
                setLikedPosts(newLikedPosts);
                // maybe show an error message?
            });


        return;
    }

    return(
        <div>
            {
                posts ? posts.map( pst => (
                    <div className={classes.pst} key={pst.id}>

                        <div className={classes.pstButtons}>
                            <IconButton aria-label="user photo" color="inherit" size='small' >
                                    <AccountCircle className={classes.pstUser} />
                            </IconButton>
                            <Typography className={classes.pstUsernameText}> <b> {pst.username} </b> </Typography>

                            <div className={classes.grow} />

                            <Typography className={classes.pstFeedText}> feed: geral </Typography>          
                        </div>

                        <Typography variant='body2' className={classes.pstDescription}> {pst.description} </Typography>

                        
                        {pst.imgUrl ? 
                            <img src={pst.imgUrl} className={classes.pstImg} alt='post image'/>
                         : <div style={{margin:12}}/> }

                        <div className={classes.pstButtons}>
                            <Typography variant='body2' className={classes.pstButtonsText}> {pst.nLikes} </Typography>
                            <IconButton aria-describedby={pst.id} aria-label="like post" color="inherit" size='small' onClick={(e) => handleClick(e,pst.id)}>
                                { likedPosts[pst.id] === undefined ? 
                                    <FavoriteBorderIcon className={classes.favouriteIcon}/>
                                    : likedPosts[pst.id] === 'hidden' ?
                                        <FavoriteIcon  className={classes.favouriteIconHidden}/>
                                        : <FavoriteIcon  className={classes.favouriteIconVisible}/>
                                }
                            </IconButton>
                            <Popover id={pst.id} open={anchors[pst.id].open} anchorEl={anchors[pst.id].value} onClose={() => handleClose(pst.id)}
                                elevation={1}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                                transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                                }}
                            >
                                <div className={classes.likeMenu}>
                                <Button 
                                    className={classes.likeOptions}
                                    size='small'  
                                    onClick={() => handleLike(pst.id, 'visible', pst.username)} 
                                    >
                                    <FavoriteIcon  className={classes.favouriteIconVisible}/>
                                </Button>
                                <Button 
                                    className={classes.likeOptions}
                                    size='small' 
                                    onClick={() => handleLike(pst.id, 'hidden', pst.username)}  
                                    >
                                    <FavoriteIcon  className={classes.favouriteIconHidden}/>
                                </Button>
                                </div>
                            </Popover>


                            <Typography style={{margin:4}}/>
                            <Typography variant='body2' className={classes.pstButtonsText}> {pst.nComments} </Typography>
                            <IconButton aria-label="comment on post" color="inherit" size='small' >
                                <ModeCommentOutlinedIcon className={classes.pstIcons}/>
                            </IconButton>

                            <Typography style={{margin:4}}/>
                            <Typography variant='body2' className={classes.pstButtonsText}> {pst.nGifts} </Typography>
                            <IconButton aria-label="give a present" color="inherit" size='small' >
                                <FilterVintageIcon className={classes.flowerIcon}/>
                            </IconButton>

                            <div className={classes.grow} />
                            <IconButton aria-label="share post outside figario" color="inherit" size='small' >
                                <ShareOutlinedIcon className={classes.pstIcons}/>
                            </IconButton>
                        </div>
                      
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
});

export default connect(mapStateToProps)(withStyles(styles)(MainFeed));