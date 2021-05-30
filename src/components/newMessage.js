import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import LockIcon from '@material-ui/icons/Lock';

import CssTextField from '../util/cssTextField';

import axios from 'axios';

import loadingCat from '../resources/loadingIcon.svg';
import fallbackImg from '../resources/blank_4_5.png';

import {connect} from 'react-redux';
import { addMessages } from  '../redux/user/userSlice';

import { useHistory } from "react-router-dom";

const styles = (theme) => ({
    ...theme.general,
    pst:{
        backgroundColor:'#ffffff',
        margin:6,
        padding:10,
        height:90,
        [theme.breakpoints.up('md')]: {
            border: '1px solid rgba(0,0,0,0.1)',
        }
    },
    addPost:{
        display:'flex',
        
    },
    circleImg:{
      height:40,
      width:40,
      objectFit: 'cover',
      borderRadius: '50%'
    },
    textField:{
        paddingLeft:0,
        paddingRight:0
    },
    textSize:{
        fontSize:14,
    },
    postOptions:{
        minWidth:0,
        paddingRight:3,
        paddingLeft:3,
        marginLeft:5
    },
    postFeed:{
        color:'rgba(0,0,0,0.4)',
        fontSize:13,
        lineHeight:1,
        padding:4,
        marginTop:10,
        paddingLeft:9
    },
    postButton:{
        minWidth:0,
        lineHeight:1,
        marginTop:10,
        marginRight:6,
        color:'#6202f3'
    }

});


function NewMessage({username,email,profilePic,classes, addMessages, receiver}) {

    const [newMessage, setNewMessage] = React.useState({description:"", visibility:"visível"});

    const history = useHistory();

      const handleWriteDescription = (event) => { 
        console.log(newMessage);
        setNewMessage({
          ...newMessage,
          description: event.target.value
        });
      }

      const handleClickPost = () => {
        if(newMessage.description){
            let hidden = true;
            if(newMessage.visibility == 'visível'){
                hidden = false;
            }

            const currentDate = new Date();
            const timestamp = currentDate.getTime();
        
            axios.post('/api/mess', {timestamp:timestamp, text: newMessage.description, profilePic: profilePic, from: username, to: receiver})
            .then((res) => {
                setNewMessage({ ...newMessage, description: ""});
                console.log(res);
            })
            .catch(err => console.log(err));
          
        } else {
          console.log('no content found.');
        }
      };

      const handleClickProfilePic = () => {
        history.push(`/${username}`);
      }

    return (
        <div className={classes.pst} >
            <div className={classes.addPost}>
             <Button 
                    style={{minWidth:0,paddingLeft:10,paddingRight:10,marginRight:10}}
                    tip='Profile picture' 
                    size='small'
                    onClick={handleClickProfilePic}
                    >
                      <div>
                      {profilePic !== '' ? 
                        <img src={profilePic} className={classes.circleImg} alt='profile' />
                      : <img src={fallbackImg} className={classes.circleImg} alt='profile' /> }
                      </div>
                     
                  
              </Button>

              <CssTextField
                  className = {classes.textField}
                  onChange={handleWriteDescription}
                  value = {newMessage.description}
                  id='comment'
                  placeholder='Escreva alguma coisa...'
                  fullWidth
                  multiline
                  rows={2}
                  rowsMax={2}
                  variant='outlined'
                  size='small'
                  InputProps={{ 
                      classes: {
                          input: classes.textSize
                      }
                    }}
                  />
              <div>
              </div>
            </div>
            <div className={classes.addPost}>
            <div className={classes.postFeed}>  Enviar mensagem para {receiver} </div>
              <div className={classes.grow} />
                  <Button 
                      className={classes.postButton}
                      tip='Create post' 
                      size='small'
                      onClick={handleClickPost}
                      >
                        SEND
                  </Button>
            </div>
            <img src={loadingCat} style={{width:'50%'}} alt='loading'hidden='hidden'/>    
          </div>
    );
}

NewMessage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    username: state.user.username,
    email: state.user.email,
    profilePic: state.user.profilePic
});

const mapActionsToProps = { addMessages };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NewMessage));