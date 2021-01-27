import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

import MainAppBar from './components/mainAppBar';
import MainFeed from './components/mainFeed';
import SideBar from './components/sideBar';
import NewPost from './components/newPost';



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
});




const App =  (props) => {

  const {classes} = props;


  return (
    <div >   
      <MainAppBar />
      <div className={classes.appbarOffset}/>
      <Grid container className={classes.background} >
        <Grid item md={3} xs={false} />
        <Grid item md={4} xs={12} className={classes.cards}>
          <NewPost />
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
