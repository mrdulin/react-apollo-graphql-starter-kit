import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PT from 'prop-types';

import queryBook from './queries/books';

class AddBook extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    evt.preventDefault();
    console.log(this.input.value);
    this.props
      .mutate({
        variables: {
          book: {
            title: this.input.value,
            author: 'mrdulin'
          }
        },
        optimisticResponse: {
          addBook: {
            title: this.input.value,
            author: 'mrdulin',
            id: Math.round(Math.random() * -1000000),
            __typename: 'Book'
          }
        },
        update: (store, res) => {
          const data = store.readQuery({ query: queryBook });
          console.log(res);
          const book = res.data.addBook;
          // book.id = Math.round(Math.random() * -1000000);
          data.books.push(book);
          store.writeQuery({ query: queryBook, data });
        }
        // mutation完毕后重新去graphql服务器查询
        // refetchQueries: [{ query: queryBook }]
      })
      .then(() => {
        this.input.value = '';
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input ref={ref => (this.input = ref)} type="text" placeholder="new book" />
      </form>
    );
  }
}

AddBook.propTypes = {
  mutate: PT.func
};

const addBookMutation = gql`
  mutation addBook($book: BookInput) {
    addBook(book: $book) {
      id
      title
      author
    }
  }
`;

export default graphql(addBookMutation)(AddBook);
