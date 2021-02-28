import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './theme';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './redux/root';
import {setAuthentication, setUserInfo} from  './redux/user/userSlice';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = "http://localhost:3001";

const store = configureStore({
  reducer: rootReducer
});

const token = localStorage.AuthToken;
if(token){
  console.log('ololo');
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  //if token expired
  if(decodedToken.exp * 1000 < Date.now()) {
    
    window.location.href = '/login';
  } else {
    //console.log( decodedToken.exp * 1000 - Date.now() + " seconds remain");
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(setAuthentication({user:decodedToken.sub, authBool: true}));

    axios.get('/api/user')
      .then((res) => {
          console.log(res.data);
          store.dispatch(setUserInfo({username: res.data.username, email: res.data.email, profilePic: res.data.profilePic}));
        })
    .catch(err => console.log(err));
  }
}

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme = {theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
