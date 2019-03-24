import { onError, ErrorResponse } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';

import { auth } from '../../services';

function createErrorLink(): ApolloLink {
  function errorHandler({ graphQLErrors, networkError, response, operation, forward }: ErrorResponse) {
    if (graphQLErrors) {
      graphQLErrors.map((error: any) => {
        if (error.code === 1001) {
          auth.signout();
          // https://github.com/apollographql/apollo-link/pull/144
          (response as any).errors = null;
        }
      });
    }

    if (networkError) {
      if ((networkError as any).statusCode === 401) {
        auth.signout();
        (response as any).errors = null;
      }
    }
  }

  return onError(errorHandler);
}

export { createErrorLink };
