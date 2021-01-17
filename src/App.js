import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import TextField from '@material-ui/core/TextField';

import MainAppBar from './components/mainAppBar';
import MainFeed from './components/mainFeed';
import SideBar from './components/sideBar';

import loadingCat from './resources/loadingIcon.svg';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

axios.defaults.baseURL = "http://localhost:3001";

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
  background:{
    backgroundColor:'#f5f5f5'
  },
  appbarOffset:{
    minHeight:52,
    maxHeight:52
  },
  textSize:{
    fontSize:14,
  },
  addPost:{
    display:'flex',
    
  },
  textField:{
    paddingLeft:0,
    paddingRight:0
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

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'rgba(0,0,0,0.13)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgba(0,0,0,0.13)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0,0,0,0.13)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0,0,0,0.13)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(0,0,0,0.13)',
      },
    },
  },
})(TextField);


const App =  (props) => {
  const {classes} = props;

  const handleImageChange = (event) => {

    const image = event.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append('image', image, image.name);

    let postData = "testing the description";
    formData.append('description', postData);

    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    console.log(timestamp);
    formData.append('timestamp', timestamp);


    axios.post('/api/upimg', formData)
        .then((res) => {
          console.log(res);
        })
        .catch(err => console.log(err));
  };

  const handleEditPicture = () => {
    
    const fileInput = document.getElementById('imageInput');
    fileInput.click();

  };

  return (
    <div >   
      <MainAppBar />
      <div className={classes.appbarOffset}/>
      <Grid container className={classes.background} >
        <Grid item md={3} xs={false} />
        <Grid item md={4} xs={12} className={classes.cards}>
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
                  id='searchbar'
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
                      >
                        POST
                  </Button>
            </div>
            
            <img src={loadingCat} style={{width:'50%'}} alt='loading'hidden='hidden'/>    
  
          </div>
          <MainFeed/>
        </Grid>
        <Grid item md={2} xs={false} >
          <SideBar />
        </Grid>
      </Grid>
      
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);
