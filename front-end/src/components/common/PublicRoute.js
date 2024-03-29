import React, { Component } from 'react';
import { Route, Navigate } from 'react-router-dom';

class PublicRoute extends Component {

  render() {
    const { component: Component, restricted, user, redirectToSpotify, ...rest } = this.props;

    // restricted = false meaning public route
    // restricted = true meaning restricted route
    return (
      <Route {...rest} render={props => (
        user.id && restricted
          ? <Navigate to="/home" {...props}/>
          : <Component redirectToSpotify={redirectToSpotify} {...props} />
      )} />
    );
  }
};

export default PublicRoute;