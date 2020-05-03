import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-components';
import { createApolloClient } from './graphql/apollo-client';
import { AppRouter } from './router';
import './index.css';

const apolloClient = createApolloClient();

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <AppRouter />
  </ApolloProvider>,
  document.getElementById('app'),
);
