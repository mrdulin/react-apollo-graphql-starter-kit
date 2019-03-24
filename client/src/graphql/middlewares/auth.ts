import { ApolloLink, Operation, NextLink } from 'apollo-link';

import { auth } from '../../services';

const authLink = new ApolloLink((operation: Operation, forward?: NextLink) => {
  const jwt = auth.getJwt();
  operation.setContext({
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });

  if (forward) {
    return forward(operation);
  }
  return null;
});

export { authLink };
