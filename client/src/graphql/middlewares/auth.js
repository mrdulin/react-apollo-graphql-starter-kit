import { ApolloLink } from 'apollo-boost';

const authLink = new ApolloLink((operation, forward) => {
  const jwt = localStorage.getItem('jwt') || '';
  operation.setContext({
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });

  return forward(operation);
});

export { authLink };
