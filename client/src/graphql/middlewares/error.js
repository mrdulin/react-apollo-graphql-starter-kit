import { onError } from 'apollo-link-error';

import { auth } from '../../services';

function createErrorLink() {
  function errorHandler({ graphQLErrors, networkError, response, operation, forward }) {
    if (graphQLErrors) {
      graphQLErrors.map(error => {
        if (error.code === 1001) {
          auth.signout();
          //https://github.com/apollographql/apollo-link/pull/144
          response.errors = null;
        }
      });
    }

    if (networkError) {
      if (networkError.statusCode === 401) {
        auth.signout();
        response.errors = null;
      }
    }
  }

  return onError(errorHandler);
}

export { createErrorLink };
