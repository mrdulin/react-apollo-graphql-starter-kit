import React from 'react';
import { Query } from 'react-apollo';
import PT from 'prop-types';

import AddBook from './AddBook';
import * as Q from 'gqlMod/queries/library.gql';

class BookList extends React.Component {
  onBookClick(id) {
    this.props.history.push(`/book-detail/${id}`);
  }
  render() {
    return (
      <div>
        <AddBook />
        <Query
          query={Q.getBooks}
          // pollInterval={5000}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error...</p>;
            return data.books.map(book => {
              return (
                <div
                  onClick={() => this.onBookClick(book.id)}
                  key={book.id}
                  className={'book ' + (book.id < 0 ? 'optimistic' : '')}>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              );
            });
          }}
        </Query>
      </div>
    );
  }
}

BookList.propTypes = {
  history: PT.object
};

export default BookList;
