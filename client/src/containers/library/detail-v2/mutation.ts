import { graphql } from 'react-apollo';

import * as M from 'gqlMod/mutations/library.gql';
import * as Q from 'gqlMod/queries/library.gql';
import { Enhancer } from '../../../types';

const addComment: Enhancer = graphql(M.ADD_COMMENT, {
  options: props => {
    return {
      update: (proxy, { data: { addComment: comment } }: any) => {
        const query = Q.BOOK_BY_ID;
        const { variables } = props.bookData;
        const { bookById }: any = proxy.readQuery({ query, variables });
        bookById.comments = bookById.comments.concat(comment);
        proxy.writeQuery({ query, variables, data: { bookById } });
      }
    };
  },
  name: 'addComment'
});

const editComment: Enhancer = graphql(M.EDIT_COMMENT, { name: 'editComment' });

const addToCart: Enhancer = graphql(M.ADD_TO_CART, {
  options: props => {
    return {
      variables: {
        book: props.bookData.bookById
      }
    };
  },
  name: 'addToCart'
});

export { addComment, editComment, addToCart };
