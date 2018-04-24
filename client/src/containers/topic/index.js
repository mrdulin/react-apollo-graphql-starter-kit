import React from 'react';
import { Query } from 'react-apollo';
import PT from 'prop-types';

import * as Q from './gql';

class Topic extends React.Component {
  static propTypes = {
    match: PT.object
  };
  componentDidCatch() {
    console.log('Topic component error');
  }
  render() {
    const { match } = this.props;
    return (
      <div>
        <Query
          query={Q.getTopicById}
          variables={{
            id: match.params.id
          }}>
          {({ loading, error, data: { topic } }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>Error</p>;
            return (
              <div>
                <h3>{topic.title}</h3>
                <section dangerouslySetInnerHTML={{ __html: topic.content }} />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Topic;
