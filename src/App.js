import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import MainAppBar from './components/mainAppBar';
import MainFeed from './components/mainFeed';

axios.defaults.baseURL = "http://localhost:3001";

const styles = (theme) => ({ 
  ...theme.general,
  background:{
    backgroundColor:'#f5f5f5'
  }
});

const App =  ({classes}) => {

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
    <div className="App">
      <MainAppBar />
      <Grid container xs={12} className={classes.background}>
        <Grid item md={3} xs={0} />
        <Grid item md={4} xs={12} className={classes.cards}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload. hmmmmmmmmmmmmmmmm
            </p>
          
            <input type='file' id='imageInput' onChange={handleImageChange} hidden='hidden'/>
            <Button 
              tip='Edit profile picture' 
              onClick={handleEditPicture} 
              >
                <EditIcon color='primary' />
            </Button>
                      
          </header>
        <MainFeed/>

        </Grid>
      </Grid>
      
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);
