import { onError } from 'apollo-link-error';

import { auth } from '../../services';

function createErrorLink(apolloClient) {
  function errorHandler({ graphQLErrors, networkError }) {
    if (graphQLErrors)
      graphQLErrors.map(error => {
        // console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        if (error.code === 1001) {
          auth.signout();

          apolloClient.cache.reset();
          window.location.replace('#/login');
          //apolloClient.resetStore()
          // .then(result => {
          //   debugger;
          //   window.location.replace('#/login');
          // })
          // .catch(err => {
          //   debugger;
          //   console.log('reset store error: ', err);
          // });
        }
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }

  return onError(errorHandler);
}

export { createErrorLink };
