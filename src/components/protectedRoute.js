import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({component: Component, authenticated, ...rest }) => (
    <Route { ...rest} render={(props) => authenticated === false? <Redirect to='/login'/> : 
        <Component {...props} /> } />
);

ProtectedRoute.propTypes = {
    user: PropTypes.object
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(ProtectedRoute);