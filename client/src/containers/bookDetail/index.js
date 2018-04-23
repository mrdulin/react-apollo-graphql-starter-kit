import React from 'react';
import { graphql } from 'react-apollo';
import PT from 'prop-types';

import { bookDetailQuery } from './queries';
import AddMessage from './AddMessage';

class BookDetail extends React.Component {
  render() {
    const {
      data: { loading, error, book },
      match
    } = this.props;
    if (loading) return <p>loading...</p>;
    if (error) return <p>{error.message}</p>;
    if (book == null) {
      return <p>Not Found</p>;
    }
    return (
      <div>
        <h3>{book.title}</h3>
        <ul>
          {book.messages.map(msg => {
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

export default graphql(bookDetailQuery, {
  options: props => {
    return {
      variables: { bookId: props.match.params.id }
    };
  }
})(BookDetail);
