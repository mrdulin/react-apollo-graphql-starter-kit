import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-boost';

import { cache } from './cache';
import { authLink, createErrorLink, terminalLink } from './middlewares';

function createApolloClient() {
  const client = new ApolloClient({
    link: from([authLink, createErrorLink(client), terminalLink]),
    cache
  });
  return client;
}

export { createApolloClient };
