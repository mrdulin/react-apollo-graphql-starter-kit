import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import * as Q from 'gqlMod/queries/library.gql';
import * as M from 'gqlMod/mutations/library.gql';

import * as PT from './propTypes';

class BookDetail extends Component {
  onAddToCartButtonClick() {
    this.props.addToCart();
  }

  render() {
    const {
      data: { loading, error, bookById: book }
    } = this.props;

    return (
      <div>
        <h2>Book Detail</h2>
        {error ? <p>{error}</p> : null}
        {loading ? <p>loading...</p> : null}

        {book ? (
          <div>
            <p>title: {book.title}</p>
            <p>author: {book.author}</p>
            <button onClick={() => this.onAddToCartButtonClick()} type="button">
              Add To Cart
            </button>
            <div>
              <h3>Comments</h3>
              <textarea name="comment" cols="60" rows="10" placeholder="type your comment" />
              <ul>
                <li>comment 1</li>
                <li>comment 2</li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

BookDetail.propTypes = {
  data: PT.query.data,
  addToCart: PT.mutation.addToCart
};

export default compose(
  graphql(Q.BOOK_BY_ID, {
    options: props => {
      return {
        variables: {
          id: props.match.params.id
        }
      };
    }
  }),
  graphql(M.ADD_TO_CART, {
    options: props => {
      return {
        variables: {
          book: props.data.bookById
        }
      };
    },
    name: 'addToCart'
  })
)(BookDetail);
