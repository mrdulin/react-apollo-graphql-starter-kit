import gql from 'graphql-tag';

export const getHomeTopics = gql`
  query getHomeTopics($qs: TopicsInput) {
    topics(qs: $qs) {
      id
      title
      tab
    }
  }
`;
