import React from 'react';
import { graphql } from 'react-apollo';
import PT from 'prop-types';

import * as Q from 'gqlMod/queries/library.gql';
import * as S from 'gqlMod/subscriptions/library.gql';

import AddMessage from './AddMessage';
import BookPreview from './BookPreview';

class BookDetail extends React.Component {
  componentWillMount() {
    console.log(this.props);
    const { match } = this.props;

    this.props.data.subscribeToMore({
      document: S.messageAdded,
      variables: {
        bookId: match.params.id
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newMessage = subscriptionData.data.messageAdded;
        const existed = prev.book.messages.findIndex(msg => msg.id === newMessage.id) !== -1;
        if (existed) {
          return prev;
        } else {
          return Object.assign({}, prev, {
            book: Object.assign({}, prev.book, {
              messages: [...prev.book.messages, newMessage]
            })
          });
        }
      }
    });
  }

  render() {
    const {
      data: { loading, error, book },
      match
    } = this.props;
    if (loading) return <BookPreview bookId={match.params.id} />;
    if (error) return <p>{error.message}</p>;
    if (book == null) {
      return <p>Not Found</p>;
    }
    const messages = book.messages || [];
    console.log('messages: ', messages);
    return (
      <div>
        <h3>{book.title}</h3>
        <ul>
          {messages.map(msg => {
            return <li key={msg.id}>{msg.text}</li>;
          })}
        </ul>
        <AddMessage match={match} />
      </div>
    );
  }
}

BookDetail.propTypes = {
  data: PT.object,
  match: PT.object
};

export default graphql(Q.bookDetailQuery, {
  options: props => {
    return {
      variables: { bookId: props.match.params.id }
    };
  }
})(BookDetail);
