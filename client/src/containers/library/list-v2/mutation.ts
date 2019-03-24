import { graphql } from 'react-apollo';

import * as M from 'gqlMod/mutations/library.gql';
import * as Q from 'gqlMod/queries/library.gql';

const addBook = graphql(M.ADD_BOOK, {
  options: props => {
    return {
      update: (proxy, { data: { addBook: book } }: any) => {
        const query = Q.BOOKS;
        const data: any = proxy.readQuery({ query });
        data.books.push(book);
        proxy.writeQuery({ query, data });
      }
    };
  },
  name: 'addBook'
});

export { addBook };
