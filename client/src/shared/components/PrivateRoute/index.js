import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as PT from 'prop-types';
import { auth } from '../../../services';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PT.any,
  location: PT.object
};

export { PrivateRoute };
