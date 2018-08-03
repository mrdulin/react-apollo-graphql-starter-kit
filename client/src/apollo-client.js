import { ApolloClient } from 'apollo-client';
import { HttpLink, from, ApolloLink, InMemoryCache, split } from 'apollo-boost';
import { toIdValue, getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';

import { auth } from './services';

const GRAPHQL_ENDPOINT = '/graphql';

const wsClient = new SubscriptionClient('ws://localhost:3000/subscriptions', {
  reconnect: true,
  connectionParams: {}
});

const wsLink = new WebSocketLink(wsClient);

const uploadLink = createUploadLink({ uri: GRAPHQL_ENDPOINT });

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });
const authMiddleware = new ApolloLink((operation, forward) => {
  const jwt = localStorage.getItem('jwt') || '';
  operation.setContext({
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });

  return forward(operation);
});
// const latencyMiddleware = setContext(() => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('delay');
//     }, 500);
//   });
// });
const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      book: (_, args) => {
        console.log('cacheRedirects args: ', args);
        return toIdValue(cache.config.dataIdFromObject({ __typename: 'Book', id: args.id }));
      }
    }
  }
});

const networkLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const isFile = value =>
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob) ||
  (typeof FileList !== 'undefined' && value instanceof FileList);

const isUpload = ({ variables }) => Object.values(variables).some(isFile);
const terminalLink = split(isUpload, uploadLink, networkLink);

function createApolloClient() {
  const client = new ApolloClient({
    link: from([
      authMiddleware,
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(error => {
            // console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
            if (error.code === 1001) {
              auth.signout();

              client.cache.reset();
              window.location.replace('#/login');
              //client.resetStore()
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
      }),
      terminalLink
    ]),
    cache
  });
  return client;
}
const client = createApolloClient();

export { client as apolloClient };
