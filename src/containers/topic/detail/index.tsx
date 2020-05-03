import React from 'react';
import { Query } from '@apollo/react-components';
import PT from 'prop-types';
import * as Q from 'gqlMod/queries/topic.gql';
import { QueryResult } from '@apollo/react-common';

interface ITopicProps {
  match: any;
}

class Topic extends React.Component<ITopicProps, any> {
  public static propTypes = {
    match: PT.object,
  };
  public componentDidCatch() {
    console.log('Topic component error');
  }
  public render() {
    const { match } = this.props;
    return (
      <div>
        <Query
          query={Q.getTopicById}
          variables={{
            id: match.params.id,
          }}
        >
          {(result: QueryResult) => {
            const {
              loading,
              error,
              data: { topic },
            } = result;
            if (loading) {
              return <p>loading...</p>;
            }
            if (error) {
              return <p>Error</p>;
            }
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
                  {topic.replies.map((reply) => {
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
