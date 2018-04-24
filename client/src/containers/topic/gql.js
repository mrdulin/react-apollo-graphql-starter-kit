import gql from 'graphql-tag';

export const getTopicById = gql`
  query getTopicById($id: ID!) {
    topic(id: $id) {
      id
      title
      content
      create_at
      visit_count
      tab
    }
  }
`;
