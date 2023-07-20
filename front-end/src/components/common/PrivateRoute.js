import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {

  render() {
    const { component: Component, user, ...rest } = this.props;

    // Show the component only when the user is logged in
    return (
      <Route {...rest} render={props => (
        user.id
          ? <Component {...props} />
          : <Redirect to="/" />
      )} />
    );
  }
};

export default PrivateRoute;