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
import {setAuthentication} from    '../redux/user/userSlice';

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

function Signup({username, email, authenticated, setAuthentication, classes}){

    const [signupInfo, setSignupInfo] = React.useState(
        {username:'', wrongUser:false, errorUsername:'',
        email:'',wrongEmail:false,errorEmail:'', 
        password:'', wrongPass:false, errorPassword:'',
        confirmPassword:'', wrongConfirmPass:false,errorConfirmPassword:''});

    const history = useHistory();

    const handleChange = (event) => {
        setSignupInfo({
            ...signupInfo,
            [event.target.id]: event.target.value
        });
    };

    const handleClick = () => {

        setSignupInfo({
            ...signupInfo,
            wrongUser: false,
            wrongEmail:false,
            wrongPass: false,
            wrongConfirmPass:false 
        });

        const userInfo = {username: signupInfo.username, email: signupInfo.email, password: signupInfo.password, confirmPassword: signupInfo.confirmPassword};

        axios.post('/api/signup', userInfo)
            .then((res) => {

                console.log(res.data);

                if(res.data.success){
                    const AuthToken = res.data.token.token;
                    console.log(AuthToken);
                    localStorage.setItem('AuthToken', AuthToken);
                    axios.defaults.headers.common['Authorization'] = AuthToken;
                    const decodedToken = jwtDecode(AuthToken);
                    setAuthentication({user:decodedToken.sub, authBool: true});
                    
                    history.push('/'); // redirects to HOME

                } else {
                    console.log('failed without going to catch');
                }
                
            })
            .catch((res) => {
                    console.log('catch activated');
                    console.log(res.response);
                    let msg = {user:'', email:'', pass:'', confirmPass:''};
                    let bools = {user:false, email: false, pass: false, confirmPass: false};
                    if(res.response.data.errors.username){
                        bools.user = true;
                        msg.user = res.response.data.errors.username;
                    }
                    if(res.response.data.errors.email){
                        bools.email = true;
                        msg.email = res.response.data.errors.email;
                    }
                    if(res.response.data.errors.password){
                        bools.pass = true;
                        msg.pass = res.response.data.errors.password;
                    }
                    if(res.response.data.errors.confirmPassword){
                        bools.confirmPass = true;
                        msg.confirmPass = res.response.data.errors.confirmPassword;
                    }

                    setSignupInfo({
                        ...signupInfo,
                        wrongUser: bools.user,
                        wrongEmail: bools.email,
                        wrongPass: bools.pass,
                        wrongConfirmPass: bools.confirmPass,
                        errorUsername: msg.user,
                        errorEmail: msg.email,
                        errorPassword: msg.pass,
                        errorConfirmPassword:msg.confirmPass
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
                <Typography align='center' variant='overline'><b>Crie sua conta</b></Typography>
            </div>
          
            <div className={classes.invisibleSeparator} />
            <CssTextField
                error={signupInfo.wrongUser}
                helperText={signupInfo.errorUsername}
                  id='username'
                  onChange={handleChange}
                  placeholder='Nome de Usuário'
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
                error={signupInfo.wrongEmail}
                helperText={signupInfo.errorEmail}
                  id='email'
                  onChange={handleChange}
                  placeholder='Email'
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
            
            <CssTextField
                error={signupInfo.wrongPass}
                helperText={signupInfo.errorPassword}
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
            <CssTextField
                error={signupInfo.wrongConfirmPass}
                helperText={signupInfo.errorConfirmPassword}
                  id='confirmPassword'
                  onChange={handleChange}
                  placeholder='Confirme sua senha'
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
                    tip='Cadastrar sua conta' 
                    color='secondary'
                    variant='outlined'
                    onClick={handleClick}

                    >
                        ENTRAR
                </Button>
                <br/>
                Já é cadastrado?<Link style={{ margin:3 }} component={RouterLink} color='secondary' to='/login'>Entre</Link> 
            </Typography>

                  
            </div>
        </Grid>
        </Grid>
       
    );
};

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    username: state.user.username,
    email: state.user.email,
    authenticated: state.user.authenticated,
});

const mapActionsToProps = { setAuthentication };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));