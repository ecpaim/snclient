import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import MainFeed from '../components/mainFeed';
import SideBar from '../components/sideBar';
import NewPost from '../components/newPost';

const styles = (theme) => ({ 
    ...theme.general,
  });

function home({classes}){
    return(
        <Grid container className={classes.background} >
            <Grid item md={3} xs={false} />
            <Grid item md={4} xs={12} >
                <NewPost />
                <MainFeed/>
            </Grid>
            <Grid item md={2} xs={false} >
                <SideBar />
            </Grid>
      </Grid>
    );
};

home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(home);