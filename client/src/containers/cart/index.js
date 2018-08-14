import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import * as PT from 'prop-types';

import * as Q from 'gqlMod/queries/library.gql';
import * as M from 'gqlMod/mutations/library.gql';

class Cart extends Component {
  minus(book) {
    this.props.removeCountFromCart({ variables: { book } });
  }

  plus(book) {
    this.props.addToCart({ variables: { book } });
  }

  remove(book) {
    this.props.removeFromCart({ variables: { book } });
  }

  removeAll() {
    this.props.removeAllFromCart();
  }

  render() {
    const { cart } = this.props;

    return (
      <div>
        <h2>Cart</h2>
        {cart.books.length ? (
          <div>
            <ul>
              {cart.books.map(book => {
                return (
                  <li key={book.id}>
                    <span>{book.title}</span>
                    <button type="button" onClick={() => this.minus(book)} disabled={book.count === 1}>
                      -
                    </button>
                    <span>count: {book.count}</span>
                    <button type="button" onClick={() => this.plus(book)} disabled={book.count === 5}>
                      +
                    </button>

                    <button type="button" onClick={() => this.remove(book)}>
                      remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <div>
              <button type="button" onClick={() => this.removeAll()}>
                Remove All
              </button>
            </div>
          </div>
        ) : (
          <p>Cart is empty</p>
        )}
      </div>
    );
  }
}

Cart.propTypes = {
  cart: PT.shape({
    books: PT.arrayOf(
      PT.shape({
        id: PT.string.isRequired,
        title: PT.string.isRequired,
        author: PT.string.isRequired,
        count: PT.number.isRequired
      })
    )
  }),
  addToCart: PT.func,
  removeFromCart: PT.func,
  removeCountFromCart: PT.func,
  removeAllFromCart: PT.func
};

export default compose(
  graphql(Q.CART, {
    props: ({ data: { cart } }) => {
      return {
        cart
      };
    }
  }),
  graphql(M.REMOVE_ALL_FROM_COUNT, { name: 'removeAllFromCart' }),
  graphql(M.ADD_TO_CART, { name: 'addToCart' }),
  graphql(M.REMOVE_FROM_CART, { name: 'removeFromCart' }),
  graphql(M.REMOVE_COUNT_FROM_CART, { name: 'removeCountFromCart' })
)(Cart);
