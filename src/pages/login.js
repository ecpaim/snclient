import React from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CssTextField from '../util/cssTextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import {Link as RouterLink} from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from 'axios';

import {connect} from 'react-redux';
import {setAuthentication, setUserInfo} from    '../redux/user/userSlice';

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
    title:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    invisibleSeparator:{
        margin:12
    },
    button:{
        backgroundColor:'#512f83',
        color:'#ffffff',
    }
  });

function Login({username, email, authenticated, setAuthentication, setUserInfo, classes}){

    const [loginInfo, setLoginInfo] = React.useState({username:'', wrongUser:false, errorUsername:'', password:'', wrongPass:false, errorPassword:''});

    const history = useHistory();

    const handleChange = (event) => {
        setLoginInfo({
            ...loginInfo,
            [event.target.id]: event.target.value
        });
    };

    const handleClick = () => {

        setLoginInfo({
            ...loginInfo,
            wrongUser: false,
            wrongPass: false,
            
        });

        const userInfo = {emailOrUser: loginInfo.username, password: loginInfo.password};

        axios.post('/api/login', userInfo)
            .then((res) => {

                console.log(res.data);

                if(res.data.success){
                    const AuthToken = res.data.token.token;
                    console.log(AuthToken);
                    localStorage.setItem('AuthToken', AuthToken);
                    axios.defaults.headers.common['Authorization'] = AuthToken;
                    const decodedToken = jwtDecode(AuthToken);
                    setAuthentication({user:decodedToken.sub, authBool: true});

                    axios.get('/api/user')
                        .then((res) => {
                            console.log(res.data);
                            setUserInfo({username: res.data.username, email: res.data.email, profilePic: res.data.profilePic});
                        })
                        .catch(err => console.log(err));
                    
                    history.push('/'); // redirects to HOME

                } else {
                    console.log('failed without going to catch');
                }
                
            })
            .catch((res) => {
                    console.log('catch activated');
                    console.log(res.response);
                    let userMsg = '';
                    let passMsg = '';
                    let userBool = false;
                    let passBool = false;
                    if(res.response.data.errors.emailOrUser){
                        userBool = true;
                        userMsg = res.response.data.errors.emailOrUser;
                    }
                    if(res.response.data.errors.password){
                        passBool = true;
                        passMsg = res.response.data.errors.password;
                    }

                    setLoginInfo({
                        ...loginInfo,
                        wrongUser: userBool,
                        wrongPass: passBool,
                        errorUsername: userMsg,
                        errorPassword: passMsg
                    });
            });

    };

    return(
        
        <Grid container className={classes.background} >
        <Grid item md={4} xs={false} />
        <Grid item md={3} xs={12} className={classes.page}>
            <div className={classes.pst}>
            <div className={classes.invisibleSeparator} />
            <div className={classes.title}>
                <Typography align='center' variant='overline'><b>Entrar em Figar.io</b></Typography>
            </div>
          
            <div className={classes.invisibleSeparator} />
            <CssTextField
                error={loginInfo.wrongUser}
                helperText={loginInfo.errorUsername}
                  id='username'
                  onChange={handleChange}
                  placeholder='Usuário ou email'
                  fullWidth
                  autoFocus
                  variant='outlined'
                  size='small'
                  InputProps={{ 
                      classes: {
                          input: classes.textSize
                      }
                    }}
                  />
            <div className={classes.invisibleSeparator} />
            
            <CssTextField
                error={loginInfo.wrongPass}
                helperText={loginInfo.errorPassword}
                  id='password'
                  onChange={handleChange}
                  placeholder='Senha'
                  fullWidth
                  variant='outlined'
                  size='small'
                  InputProps={{ 
                      classes: {
                          input: classes.textSize
                      }
                    }}
                  />
            <div className={classes.invisibleSeparator} />
            <Typography variant='body2' align='center'>
                <Button 
                    tip='Entrar na sua conta' 
                    color='secondary'
                    variant='outlined'
                    onClick={handleClick}

                    >
                        ENTRAR
                </Button>
                <br/>
                ou <Link style={{ margin:3 }} component={RouterLink} color='secondary' to='/signup'>crie sua conta</Link> 
            </Typography>

                  
            </div>
        </Grid>
        </Grid>
        
    );
};

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    username: state.user.username,
    email: state.user.email,
    authenticated: state.user.authenticated,
});

const mapActionsToProps = { setAuthentication, setUserInfo };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));