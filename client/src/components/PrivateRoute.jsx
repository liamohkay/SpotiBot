// Libraries + dependencies
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={props => (
        currentUser
          ? <Component {...props} user={user} />
          : <Redirect to="/login" />
      )}
    />
  );
}

export default PrivateRoute;