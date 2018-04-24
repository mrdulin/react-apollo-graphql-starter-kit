import React from 'react';
import { Query } from 'react-apollo';

import * as Q from './gql';

class Topics extends React.Component {
  constructor() {
    super();
    this.page = 1;
    this.limit = 2;
  }
  onLoadMore(fetchMore) {
    const page = this.page + 1;
    return fetchMore({
      variables: {
        qs: {
          page,
          limit: this.limit
        }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          topics: [...prev.topics, ...fetchMoreResult.topics]
        });
      }
    });
  }
  render() {
    return (
      <div>
        <h2>Topics</h2>
        <Query
          query={Q.getHomeTopics}
          variables={{
            qs: {
              page: this.page,
              limit: this.limit
            }
          }}>
          {({ loading, error, data: { topics }, fetchMore }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>error</p>;
            return (
              <div>
                <ul>
                  {topics.map(topic => {
                    return <li key={topic.id}>{topic.title}</li>;
                  })}
                </ul>
                <button type="button" onClick={() => this.onLoadMore(fetchMore)}>
                  加载更多
                </button>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Topics;
