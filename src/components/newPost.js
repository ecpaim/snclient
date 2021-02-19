import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

import CssTextField from '../util/cssTextField';

import axios from 'axios';

import loadingCat from '../resources/loadingIcon.svg';

import {connect} from 'react-redux';

const styles = (theme) => ({
    ...theme.general,
    pst:{
        backgroundColor:'#ffffff',
        margin:6,
        padding:10,
        [theme.breakpoints.up('md')]: {
            border: '1px solid rgba(0,0,0,0.1)',
        }
    },
    addPost:{
        display:'flex',
        
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


function NewPost({username,email,classes}) {

    const [newPost, setNewPost] = React.useState({description:"", imageUrl:"",formData:"",feed:'geral'});

    const handleImageChange = (event) => {

        const image = event.target.files[0];
        
        const formData = new FormData();
        formData.append('image', image, image.name);
        console.log('formdata[image]:');
        console.log(formData.get('image'));
    
        setNewPost({
          ...newPost,
          formData: formData,
          imageUrl: URL.createObjectURL(image)
        });
      };
    
      const handleEditPicture = () => {
        
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    
      };
    
      const handleWriteDescription = (event) => { 
        console.log(newPost);
        setNewPost({
          ...newPost,
          description: event.target.value
        });
      }
      
      const handleClickPost = () => {
        if(newPost.description || newPost.formData['image']){
          let fd;
          if(newPost.formData){
            fd = newPost.formData;
          } else {
            fd = new FormData();
          }
    
          fd.append('description', newPost.description);
    
          const currentDate = new Date();
          const timestamp = currentDate.getTime();
          console.log(timestamp);
          fd.append('timestamp', timestamp);
    
          if(newPost.imageUrl){ // post with images
            axios.post('/api/pstimg', fd)
            .then((res) => {
              console.log(res);
            })
            .catch(err => console.log(err));
    
          } else { // post without images
            axios.post('/api/pst', {timestamp:timestamp, description: newPost.description})
            .then((res) => {
              console.log(res);
            })
            .catch(err => console.log(err));
          }
          
    
        } else {
          console.log('no content found.');
        }
      };

    return (
        <div className={classes.pst}>
            <div className={classes.addPost}>
             <Button 
                    style={{minWidth:0,paddingLeft:10,paddingRight:10,marginRight:10}}
                    tip='Profile picture' 
                    size='small'
                    >
                    <AccountCircle style={{fontSize:34}}/>
              </Button>

              <CssTextField
                  className = {classes.textField}
                  onChange={handleWriteDescription}
                  id='description'
                  placeholder='Escreva alguma coisa...'
                  fullWidth
                  multiline
                  rows={2}
                  rowsMax={4}
                  variant='outlined'
                  size='small'
                  InputProps={{ 
                      classes: {
                          input: classes.textSize
                      }
                    }}
                  />
              <div>
                    <div>
                      <input type='file' id='imageInput' onChange={handleImageChange} hidden='hidden'/>
                      <Button 
                        className={classes.postOptions}
                        size='small'
                        tip='Add Image' 
                        onClick={handleEditPicture} 
                        >
                          <ImageIcon color='secondary' style={{fontSize:20}} />
                      </Button>
                    </div>

                    <div>
                      <Button 
                        className={classes.postOptions}
                        size='small'
                        tip='Change visibility' 
                        
                        >
                          <LockIcon color='secondary' style={{fontSize:20}}/>
                      </Button>
                    </div>
              </div>
            </div>
            <div className={classes.addPost}>
            <div className={classes.postFeed}>  Postar em: geral  </div>
              <div className={classes.grow} />
                  <Button 
                      className={classes.postButton}
                      tip='Create post' 
                      size='small'
                      onClick={handleClickPost}
                      >
                        POST
                  </Button>
            </div>
            {
              newPost.imageUrl ? <img src={newPost.imageUrl} style={{width:'50%'}} alt='preview'/> 
                : null
            }
            <img src={loadingCat} style={{width:'50%'}} alt='loading'hidden='hidden'/>    
  
          </div>
    );
}

NewPost.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    username: state.user.username,
    email: state.user.email
});

export default connect(mapStateToProps)(withStyles(styles)(NewPost));