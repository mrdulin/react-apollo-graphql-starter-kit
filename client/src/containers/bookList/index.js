import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class BookList extends React.Component {
  render() {
    return (
      <Query
        query={gql`
          {
            books {
              id
              title
              author
            }
          }
        `}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;
          return data.books.map(book => {
            return (
              <div key={book.id}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            );
          });
        }}
      </Query>
    );
  }
}

export default BookList;
