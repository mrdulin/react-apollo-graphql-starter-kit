import React, { PureComponent, ReactNode } from 'react';
import { graphql, compose, MutationFunc, OptionProps } from 'react-apollo';
import PT from 'prop-types';

import * as Q from 'gqlMod/queries/library.gql';
import * as M from 'gqlMod/mutations/library.gql';

import { IBook } from '../../types';

interface ICartMutations {
  removeAllFromCart: MutationFunc;
  addToCart: MutationFunc;
  removeFromCart: MutationFunc;
  removeCountFromCart: MutationFunc;
}

interface ICartProps {
  cart: {
    books: IBook[];
  };
}

type Props = ICartMutations & ICartProps;

class Cart extends PureComponent<Props, any> {
  public static propsTypes = {
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

  public static defaultProps: ICartProps = {
    cart: { books: [] }
  };

  public render(): ReactNode {
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

  private minus(book: IBook) {
    this.props.removeCountFromCart({ variables: { book } });
  }

  private plus(book: IBook) {
    this.props.addToCart({ variables: { book } });
  }

  private remove(book: IBook) {
    this.props.removeFromCart({ variables: { book } });
  }

  private removeAll() {
    this.props.removeAllFromCart();
  }
}

export default compose(
  graphql(Q.CART, {
    props: (props: any) => {
      const {
        data: { cart }
      } = props;
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
