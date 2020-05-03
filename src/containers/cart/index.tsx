import React, { PureComponent, ReactNode, Fragment } from 'react';
import * as Q from 'gqlMod/queries/library.gql';
import * as M from 'gqlMod/mutations/library.gql';
import { Mutation, Query } from '@apollo/react-components';
import { MutationFunction, QueryResult } from '@apollo/react-common';

class Cart extends PureComponent {
  public render(): ReactNode {
    return (
      <Query query={Q.CART}>
        {(result: QueryResult) => {
          const {
            data: { books },
          } = result;
          return (
            <Fragment>
              <h2>Cart</h2>
              {books.length ? (
                <div>
                  <ul>
                    {books.map((book) => {
                      return (
                        <li key={book.id}>
                          <span>{book.title}</span>
                          <Mutation mutation={M.REMOVE_COUNT_FROM_CART}>
                            {(removeCountFromCart: MutationFunction) => (
                              <button
                                type="button"
                                onClick={() => removeCountFromCart({ variables: { book } })}
                                disabled={book.count === 1}
                              >
                                -
                              </button>
                            )}
                          </Mutation>

                          <span>count: {book.count}</span>
                          <Mutation mutation={M.ADD_TO_CART}>
                            {(addToCart: MutationFunction) => (
                              <button
                                type="button"
                                onClick={() => addToCart({ variables: { book } })}
                                disabled={book.count === 5}
                              >
                                +
                              </button>
                            )}
                          </Mutation>

                          <Mutation mutation={M.REMOVE_FROM_CART}>
                            {(removeFromCart: MutationFunction) => (
                              <button type="button" onClick={() => removeFromCart({ variables: { book } })}>
                                remove
                              </button>
                            )}
                          </Mutation>
                        </li>
                      );
                    })}
                  </ul>
                  <div>
                    <Mutation mutation={M.REMOVE_ALL_FROM_COUNT}>
                      {(removeAllFromCart: MutationFunction) => (
                        <button type="button" onClick={() => removeAllFromCart()}>
                          Remove All
                        </button>
                      )}
                    </Mutation>
                  </div>
                </div>
              ) : (
                <p>Cart is empty</p>
              )}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Cart;
