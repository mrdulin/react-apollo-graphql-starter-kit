import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
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

    this.pagination = {
      offset: 0,
      limit: 2
    };

    this.state = {
      comment: ''
    };
  }

  componentWillMount() {
    console.log('componentWillMount', this.props);
    this.setState({ comment: this.props.bookDetail.comment });
  }

  componentWillUnmount() {
    this.props.editComment({ variables: { text: this.state.comment } });
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

    this.props.addComment({ variables: { comment: { bookId: this.props.match.params.id, text } } }).then(res => {
      console.log('addComment res: ', res);
      this.setState({ comment: '' });
    });
  }

  onTextAreaChange(evt) {
    const {
      nativeEvent: { target }
    } = evt;
    const comment = target.value;
    this.setState({ comment });
  }

  onLoadMore() {
    const { match, onLoadMore } = this.props;
    const { offset, limit } = this.pagination;
    const nextOffset = offset + 1;
    onLoadMore({ id: match.params.id, offset: nextOffset, limit, skip: false });
  }

  render() {
    const {
      bookData: { loading, error, bookById: book }
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
                  value={this.state.comment}
                  onChange={this.onTextAreaChange}
                  placeholder="type your comment"
                  required
                />
                <div>
                  <input type="submit" value="submit" />
                </div>
              </form>

              {book.comments.length ? (
                <div>
                  <ul>
                    {book.comments.map(comment => {
                      return <li key={comment.id}>{comment.text}</li>;
                    })}
                  </ul>
                  <button type="button" onClick={() => this.onLoadMore()}>
                    Load More
                  </button>
                </div>
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
  bookData: PT.query.data,
  addToCart: PT.mutation.addToCart,
  match: propTypes.object,
  addComment: propTypes.func,
  editComment: propTypes.func,
  bookDetail: propTypes.object,
  onLoadMore: propTypes.func,
  client: propTypes.object
};

export default compose(
  withApollo,
  graphql(Q.BOOK_BY_ID, {
    props: ({ data: bookData }) => {
      return { bookData };
    },
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
          const { variables } = props.bookData;
          const { bookById } = proxy.readQuery({ query, variables });
          bookById.comments = bookById.comments.concat(addComment);
          proxy.writeQuery({ query, variables, data: { bookById } });
        }
      };
    },
    name: 'addComment'
  }),
  graphql(Q.BOOK_DETAIL, {
    props: ({ data: { bookDetail } }) => ({ bookDetail })
  }),
  graphql(Q.COMMENT_BY_PAGE, {
    options: () => {
      return {
        // https://github.com/apollographql/react-apollo/issues/289
        // Do not query when react component is mounted. Query when user click "Load More" button
        variables: { skip: true }
      };
    },
    props: ({ data }) => {
      return {
        onLoadMore: ({ id, offset, limit, skip }) => {
          return data.fetchMore({
            variables: {
              id,
              offset,
              limit,
              skip
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              //Can I update local state here?
              return prev;
            }
          });
        }
      };
    }
  }),
  graphql(M.EDIT_COMMENT, { name: 'editComment' }),
  graphql(M.ADD_TO_CART, {
    options: props => {
      return {
        variables: {
          book: props.bookData.bookById
        }
      };
    },
    name: 'addToCart'
  })
)(BookDetail);
