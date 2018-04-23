import React from 'react';
import { Query } from 'react-apollo';

import AddBook from './AddBook';
import queryBook from './queries/books';

class BookList extends React.Component {
  render() {
    return (
      <div>
        <AddBook />
        <Query
          query={queryBook}
          // pollInterval={5000}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error...</p>;
            return data.books.map(book => {
              return (
                <div key={book.id} className={'book ' + (book.id < 0 ? 'optimistic' : '')}>
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

export default BookList;
