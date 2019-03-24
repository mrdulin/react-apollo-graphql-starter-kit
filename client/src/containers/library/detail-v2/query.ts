import { graphql } from 'react-apollo';

import * as Q from 'gqlMod/queries/library.gql';
import { Enhancer } from '../../../types';

const bookById: Enhancer = graphql(Q.BOOK_BY_ID, {
  props: ({ data: bookData }) => {
    return { bookData };
  },
  options: (props: any) => {
    return {
      variables: {
        id: props.match.params.id
      }
    };
  }
});

const bookDetail: Enhancer = graphql(Q.BOOK_DETAIL, {
  props: ({ data: { bookDetail: book } }: any) => ({ bookDetail: book })
});

const commentsByPage: Enhancer = graphql(Q.COMMENT_BY_PAGE, {
  options: () => {
    return {
      // https://github.com/apollographql/react-apollo/issues/289
      // Do not query when react component is mounted. Query when user click "Load More" button
      variables: { skip: true }
    };
  },
  props: ({ data }) => {
    return {
      onLoadMore: ({ id, offset, limit, skip }: any) => {
        if (data) {
          return data.fetchMore({
            variables: {
              id,
              offset,
              limit,
              skip
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }
              // Can I update local state here?
              return prev;
            }
          });
        }
      }
    };
  }
});

export { bookById, bookDetail, commentsByPage };
