import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
        refetchQueries: [{ query: queryBook }]
      })
      .then(() => {
        this.input.value = '';
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

const addBookMutation = gql`
  mutation addBook($book: BookInput) {
    addBook(book: $book) {
      title
      author
    }
  }
`;

export default graphql(addBookMutation)(AddBook);
