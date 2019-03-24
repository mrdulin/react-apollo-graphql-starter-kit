import React from 'react';
import { Query } from 'react-apollo';
import PT from 'prop-types';

import * as Q from 'gqlMod/queries/topic.gql';

class Topics extends React.Component {
  static propTypes = {
    history: PT.object
  };

  constructor() {
    super();
    this.page = 1;
    this.limit = 2;
  }
  onLoadMore(fetchMore) {
    const page = this.page + 1;
    this.page = page;
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

  onTopicClick(topic) {
    this.props.history.push(`/topic/${topic.id}`);
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
                    return (
                      <li onClick={() => this.onTopicClick(topic)} key={topic.id}>
                        {topic.title}
                      </li>
                    );
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
