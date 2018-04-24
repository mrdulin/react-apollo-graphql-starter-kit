import React from 'react';
import { Query, graphql } from 'react-apollo';

import * as Q from './gql';

class Topics extends React.Component {
  render() {
    return (
      <div>
        <h2>Topics</h2>
        <Query query={Q.getHomeTopics}>
          {({ loading, error, data: { topics } }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>error</p>;
            return (
              <ul>
                {topics.map(topic => {
                  return <li key={topic.id}>{topic.title}</li>;
                })}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default graphql(Q.getHomeTopics, {
  options: props => {
    return {
      variables: {}
    };
  }
})(Topics);
