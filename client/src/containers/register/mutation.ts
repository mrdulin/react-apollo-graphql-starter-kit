import { graphql } from 'react-apollo';

import * as M from 'gqlMod/mutations/user.gql';

const register = graphql(M.REGISTER, {
  options: {
    errorPolicy: 'all'
  },
  name: 'register'
});

export { register };
