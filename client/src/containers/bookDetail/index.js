import React from 'react';
import { graphql } from 'react-apollo';
import PT from 'prop-types';

import * as Q from './query.gql';

import AddMessage from './AddMessage';
import BookPreview from './BookPreview';

class BookDetail extends React.Component {
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
