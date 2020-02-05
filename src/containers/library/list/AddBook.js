import React from 'react';
import { graphql } from 'react-apollo';
import PT from 'prop-types';

import * as Q from 'gqlMod/queries/library.gql';
import * as M from 'gqlMod/mutations/library.gql';

class AddBook extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    evt.preventDefault();
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
          const data = store.readQuery({ query: Q.getBooks });
          console.log(res);
          const book = res.data.addBook;
          data.books.push(book);
          store.writeQuery({ query: Q.getBooks, data });
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

export default graphql(M.addBook)(AddBook);
