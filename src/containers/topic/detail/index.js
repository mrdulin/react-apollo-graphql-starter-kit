import React from 'react';
import { Query } from 'react-apollo';
import PT from 'prop-types';

import * as Q from 'gqlMod/queries/topic.gql';

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
                <div>
                  <span>作者：</span>
                  <a>
                    <img className="avatar" src={topic.author.avatar_url} alt="avatar" />
                  </a>
                  <span>{topic.author.loginname}</span>
                </div>
                <article dangerouslySetInnerHTML={{ __html: topic.content }} />
                <hr />
                <section>
                  {topic.replies.map(reply => {
                    return (
                      <div key={reply.id}>
                        <div dangerouslySetInnerHTML={{ __html: reply.content }} />
                      </div>
                    );
                  })}
                </section>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Topic;
