import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import * as Q from 'gqlMod/queries/library.gql';
import * as M from 'gqlMod/mutations/library.gql';

import * as PT from './propTypes';
import * as propTypes from 'prop-types';

class BookDetail extends Component {
  constructor(...args) {
    super(...args);
    this.onCommentSumit = this.onCommentSumit.bind(this);
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
  }

  onAddToCartButtonClick() {
    this.props.addToCart();
  }

  onCommentSumit(evt) {
    evt.preventDefault();
    const {
      nativeEvent: { target }
    } = evt;

    const $comment = target.elements.comment;
    const text = $comment.value.trim();

    this.props.addComment({ variables: { comment: { bookId: this.props.match.params.id, text } } });
  }

  onTextAreaChange(evt) {
    const {
      nativeEvent: { target }
    } = evt;
    const text = target.value.trim();
    console.log('onTextAreaChange: ', text);
    this.props.editComment({ variables: { text } });
  }

  render() {
    const {
      data: { loading, error, bookById: book }
    } = this.props;

    console.log('this.props: ', this.props);

    return (
      <div>
        <h2>Book Detail</h2>
        {error ? <p>{error}</p> : null}
        {loading ? <p>loading...</p> : null}

        {book ? (
          <div>
            <p>title: {book.title}</p>
            <p>author: {book.author}</p>
            <div>
              <button onClick={() => this.onAddToCartButtonClick()} type="button">
                Add To Cart
              </button>
              {book.count ? <span>count: {book.count}</span> : null}
              <Link to="/cart">Go To Cart</Link>
            </div>

            <div>
              <h3>Comments</h3>
              <form onSubmit={this.onCommentSumit}>
                <textarea
                  name="comment"
                  cols="60"
                  rows="10"
                  onChange={this.onTextAreaChange}
                  placeholder="type your comment"
                  required
                  defaultValue={''}
                />
                <div>
                  <input type="submit" value="submit" />
                </div>
              </form>

              {book.comments.length ? (
                <ul>
                  {book.comments.map(comment => {
                    return <li key={comment.id}>{comment.text}</li>;
                  })}
                </ul>
              ) : (
                <p>No Comment</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

BookDetail.propTypes = {
  data: PT.query.data,
  addToCart: PT.mutation.addToCart,
  match: propTypes.object,
  addComment: propTypes.func,
  editComment: propTypes.func
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
  graphql(M.ADD_COMMENT, {
    options: props => {
      return {
        update: (proxy, { data: { addComment } }) => {
          const query = Q.BOOK_BY_ID;
          const variables = { id: props.match.params.id };
          const data = proxy.readQuery({ query, variables });
          const { bookById } = data;
          bookById.comments = bookById.comments.concat(addComment);
          proxy.writeQuery({ query, variables, data });
        }
      };
    },
    name: 'addComment'
  }),
  graphql(M.EDIT_COMMENT, { name: 'editComment' }),
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
