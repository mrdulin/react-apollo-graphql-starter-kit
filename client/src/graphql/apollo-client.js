import { from } from 'apollo-boost';

// apollo-boost导出的ApolloClient会丢失authMiddleware
// https://www.apollographql.com/docs/link/links/state.html

import { ApolloClient } from 'apollo-client';

import { cache } from './cache';
import { authLink, createErrorLink, uploadLink, stateLink } from './middlewares';

function createApolloClient() {
  const client = new ApolloClient({
    link: from([authLink, createErrorLink(client), stateLink, uploadLink]),
    cache
  });
  return client;
}

export { createApolloClient };
