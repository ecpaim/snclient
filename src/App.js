import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import MainAppBar from './components/mainAppBar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import PostPage from './pages/postpage';
import ProtectedRoute from './components/protectedRoute';
import AuthRoute from './components/authRoute';

import {Switch as RouterSwitch, Route} from "react-router-dom";





const styles = (theme) => ({ 
  ...theme.general,
  typography:{
    fontSize:10
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
      <RouterSwitch>
        <Route exact path='/' component={Home} />
        <AuthRoute exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/pst/:userid/:timeid' component={PostPage} />
      </RouterSwitch>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);
