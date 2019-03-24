import React, { ReactElement, SFC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import PT from 'prop-types';

import { auth } from '../../../services';

const PrivateRoute: SFC<RouteProps> = ({
  component: Component,
  ...rest
}: RouteProps): ReactElement<RouteProps> | null => {
  console.log('Component: ', Component);
  if (Component) {
    return (
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
  }
  return null;
};

export { PrivateRoute };
