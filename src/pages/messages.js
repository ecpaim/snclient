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
import NewMessage from '../components/newMessage';
import { setCurrentChat, addMessages } from  '../redux/user/userSlice';
import fallbackImg from '../resources/blank_4_5.png';
import loadingCat from '../resources/loadingIcon.svg';
import Post from '../components/post';

import titleImg from '../resources/no_eyes.svg';

import formatTimestamp from '../util/time_formatting';

const styles = (theme) => ({ 
    ...theme.general,
    titlePst:{
        backgroundColor:'#ffffff',
        display:'flex',
        height:22,
        fontSize:14,
        margin:6,
        [theme.breakpoints.up('md')]: {
            padding:10,
            border: '1px solid rgba(0,0,0,0.1)',
        }
    },
    titleImg:{
        height: 15,
        padding:6
    },
    titleText:{
        fontSize:15,
        padding:4,
        paddingLeft:6,
        paddingRight:6
    },
    messageBackground: {
        backgroundColor:'#ededed',
        height:'calc(100vh - 232px)',
        margin:6,
        marginBottom:0,
        overflow:'scroll'
    },
    display:{
        display: 'flex',
    },
    userMessage: {
        borderRadius: 6,
        display:'flex',
        width: '42%',
        margin: 6,
        padding: 10,
        backgroundColor: '#ffffff'
    },
    receiverMessage: {
        borderRadius: 6,
        display:'flex',
        width: '42%',
        margin: 6,
        padding: 10,
        backgroundColor: theme.palette.secondary.main,
        color: '#ffffff'
    },
    messageText: {
        width:'60%',
        fontSize:14,
        padding:6,
        paddingBottom:2
    },
    circleImg:{
        fontSize:10,
        marginRight: 6,
        height:35,
        width: 35,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    timeText:{
        color:'rgba(0,0,0,0.4)',
        fontSize:12,
        lineHeight:1,
        padding:6
    },
    receiverTimeText:{
        fontSize:12,
        lineHeight:1,
        padding:6
    },

  });

function Messages({username,  classes, addMessages, profilePic, currentChat}){

    const {userid} = useParams();
    const [latestMsg, setLatestMsg] = React.useState(0);
    /*
    React.useEffect(()=> {

        let params = { username: userid };
        axios.post('/api/retrievemess', params)
            .then(res => {
                console.log('param: ');
                console.log(res.data);
                setCurrentChat(res.data);
            })
            .catch(err => console.log(err));
        
    }, []);
    */

    React.useEffect(() => {

        let latest_time = latestMsg; 
        /* setInterval doesn't have access to the updates of 
            latestMsg, so we need to keep a local copy of it
        */

        const interval = setInterval(() => { 
       
            let params = { username: userid, timestamp: latest_time };
            console.log('sending timestamp '+params.timestamp);
            axios.post('/api/retrievelatestmess', params)
                .then(res => {
                    console.log('data after 10 seconds:');
                    console.log(res.data);

                    if(res.data.length > 0){
                        latest_time = res.data[res.data.length-1].timestamp;
                        setLatestMsg(() => latest_time);
                        addMessages(res.data);
                    }
                
                })
                .catch(err => console.log(err));
        
        }, 20000); // 10,000 = 10s

        let params = { username: userid, timestamp: latestMsg };
        axios.post('/api/retrievelatestmess', params)
            .then(res => {
                console.log('data after 10 seconds:');
                console.log(res.data);

                if(res.data.length > 0){
                    latest_time = res.data[res.data.length-1].timestamp;
                    setLatestMsg(() => latest_time);
                    addMessages(res.data);
                    }
                
            })
            .catch(err => console.log(err));

        return () => clearInterval(interval); //return unmount function to prevent memory leaks
    }, []);

    return(
        <Grid container className={classes.background} >
            <Grid item md={2} xs={false} />
            <Grid item md={5} xs={12} >
                <div className={classes.titlePst}>
                    <img src={titleImg} className={classes.titleImg} alt={userid}/>
                    <Typography className={classes.titleText}>•</Typography>
                    <Typography className={classes.titleText}><b>{userid}</b></Typography>
                </div>
               <div className={classes.messageBackground}>
                    {currentChat.length > 0 ? 
                        currentChat.map((msg) => {
                            return msg.from === username ? 
                            (
                                <div className={classes.display}>
                                    <div className={classes.grow} />
                                    <div className={classes.userMessage}>
                                        <img src={profilePic} className={classes.circleImg} alt={username}/>
                                        <Typography className={classes.messageText}> {msg.text} </Typography>
                                        <div className={classes.grow} />
                                        <Typography className={classes.timeText}>{formatTimestamp(msg.timestamp)}</Typography>
                                    </div>
                                </div>
                            ) : (
                                <div className={classes.display}>
                                    <div className={classes.receiverMessage}>
                                        <img src={msg.profilePic} className={classes.circleImg} alt={userid}/>
                                        <Typography className={classes.messageText}> {msg.text} </Typography>
                                        <div className={classes.grow} />
                                        <Typography className={classes.receiverTimeText}>{formatTimestamp(msg.timestamp)}</Typography>
                                    </div>
                                </div>
                                )
                        })

                    : null}

               </div>
               
               <NewMessage receiver={userid}/>
            </Grid>
            <Grid item md={2} xs={false} >
                <SideBar />
            </Grid>
      </Grid>
    );
};

Messages.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    username: state.user.username,
    authenticated: state.user.authenticated,
    likes: state.user.likes,
    currentChat: state.user.currentChat,
    profilePic: state.user.profilePic
});

const mapActionsToProps = { setCurrentChat, addMessages };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Messages));