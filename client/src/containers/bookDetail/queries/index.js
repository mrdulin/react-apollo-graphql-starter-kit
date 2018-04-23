import gql from 'graphql-tag';

export const bookDetailQuery = gql`
  query bookDetailQuery($bookId: ID!) {
    book(id: $bookId) {
      id
      title
      author
      messages {
        id
        text
      }
    }
  }
`;
