import React from 'react';
import { Query } from '@apollo/react-components';
import PT from 'prop-types';
import * as Q from 'gqlMod/queries/topic.gql';
import { QueryResult } from '@apollo/react-common';
import { History } from 'history';

interface ITopicsProps {
  history: History;
}

class Topics extends React.Component<ITopicsProps> {
  public static propTypes = {
    history: PT.object,
  };

  private page: number;
  private limit: number;

  constructor(props) {
    super(props);
    this.page = 1;
    this.limit = 2;
  }

  public render() {
    return (
      <div>
        <h2>Topics</h2>
        <Query
          query={Q.getHomeTopics}
          variables={{
            qs: {
              page: this.page,
              limit: this.limit,
            },
          }}
        >
          {(result: QueryResult) => {
            const {
              loading,
              error,
              data: { topics },
              fetchMore,
            } = result;
            if (loading) {
              return <p>loading...</p>;
            }
            if (error) {
              return <p>error</p>;
            }
            return (
              <div>
                <ul>
                  {topics.map((topic) => {
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

  private onLoadMore(fetchMore) {
    const page = this.page + 1;
    this.page = page;
    return fetchMore({
      variables: {
        qs: {
          page,
          limit: this.limit,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return Object.assign({}, prev, {
          topics: [...prev.topics, ...fetchMoreResult.topics],
        });
      },
    });
  }

  private onTopicClick(topic) {
    this.props.history.push(`/topic/${topic.id}`);
  }
}

export default Topics;
