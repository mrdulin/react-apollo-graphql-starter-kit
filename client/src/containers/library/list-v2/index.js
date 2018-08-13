import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import * as PT from './propTypes';

import * as Q from 'gqlMod/queries/library.gql';
import * as M from 'gqlMod/mutations/library.gql';

import BookList from './components/BookList';

class Library extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      error: ''
    };
  }

  onBookClick(book) {
    this.props.history.push(`/book-detail/${book.id}`);
  }

  onSubmit(evt) {
    evt.preventDefault();
    const {
      nativeEvent: { target }
    } = evt;
    const {
      elements: { bookName: bookNameInput, authorName: authorNameInput }
    } = target;
    const bookName = bookNameInput.value;
    const authorName = authorNameInput.value;
    if (!bookName) {
      return this.setState({ error: 'book name is required' });
    }
    if (!authorName) {
      return this.setState({ error: 'author name is required' });
    }

    this.props.addBook({ variables: { book: { title: bookName, author: authorName } } });
  }

  render() {
    const {
      data: { loading, error, books }
    } = this.props;

    if (error || this.state.error) {
      return <p>{'error...' || this.state.error}</p>;
    } else if (loading) {
      return <p>loading...</p>;
    } else {
      return (
        <div>
          <form onSubmit={e => this.onSubmit(e)}>
            <div>
              <label>
                book name:
                <input type="text" name="bookName" placeholder="new book" required />
              </label>
            </div>
            <div>
              <label>
                author name:
                <input type="text" name="authorName" placeholder="enter author name" required />
              </label>
            </div>
            <div>
              <input type="submit" value="submit" />
            </div>
          </form>
          <BookList datas={books} onClick={book => this.onBookClick(book)} />
        </div>
      );
    }
  }
}

Library.propTypes = {
  data: PT.query.data,
  history: PT.history,
  addBook: PT.mutation.addBook
};

export default compose(
  graphql(Q.BOOKS),
  graphql(M.ADD_BOOK, {
    options: props => {
      return {
        update: (proxy, { data: { addBook } }) => {
          const query = Q.BOOKS;
          const data = proxy.readQuery({ query });
          data.books.push(addBook);
          proxy.writeQuery({ query, data });
        }
      };
    },
    name: 'addBook'
  })
)(Library);
