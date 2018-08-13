import { ApolloLink } from 'apollo-boost';
import { auth } from '../../services';

const authLink = new ApolloLink((operation, forward) => {
  const jwt = auth.getJwt();
  operation.setContext({
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });

  return forward(operation);
});

export { authLink };
