import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import { apolloClient } from './apollo-client';
import { AppRouter } from './router';

import './index.css';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <AppRouter />
  </ApolloProvider>,
  document.getElementById('app')
);
