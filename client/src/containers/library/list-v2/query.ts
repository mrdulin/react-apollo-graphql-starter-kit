import { graphql } from 'react-apollo';

import * as Q from 'gqlMod/queries/library.gql';

const books = graphql(Q.BOOKS);

export { books };
