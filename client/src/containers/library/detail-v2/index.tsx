import React, { PureComponent, ReactNode } from 'react';
import { compose, withApollo, MutationFunc } from 'react-apollo';
import { ApolloQueryResult } from 'apollo-client';
import { Link, RouteComponentProps } from 'react-router-dom';
import propTypes from 'prop-types';

import * as PT from './propTypes';
import * as Q from './query';
import * as M from './mutation';

interface IBookDetailProps {
  bookDetail: any;
  bookData: any;
}

interface ILoadMoreParams {
  id: string;
  offset: number;
  limit: number;
  skip: boolean;
}

interface IBookDetailMutations {
  editComment: MutationFunc;
  addToCart: MutationFunc;
  addComment: MutationFunc;
  onLoadMore: (params: ILoadMoreParams) => Promise<ApolloQueryResult<any>>;
}

interface IBookDetailState {
  comment: string;
}

interface IParams {
  id: string;
}

type State = Readonly<IBookDetailState>;
type Props = Readonly<RouteComponentProps<IParams> & IBookDetailProps & IBookDetailMutations>;

class BookDetail extends PureComponent<Props, State> {
  public static propTypes = {
    bookData: PT.query.data,
    addToCart: PT.mutation.addToCart,
    match: propTypes.object,
    addComment: propTypes.func,
    editComment: propTypes.func,
    bookDetail: propTypes.object,
    onLoadMore: propTypes.func,
    client: propTypes.object
  };

  public static defaultProps: Partial<Props> = {};

  private pagination = {
    offset: 0,
    limit: 2
  };

  constructor(props: Props) {
    super(props);
    this.onCommentSumit = this.onCommentSumit.bind(this);
    this.onTextAreaChange = this.onTextAreaChange.bind(this);

    this.state = {
      comment: ''
    };
  }

  public componentWillMount() {
    console.log('componentWillMount', this.props);
    this.setState({ comment: this.props.bookDetail.comment });
  }

  public componentWillUnmount() {
    this.props.editComment({ variables: { text: this.state.comment } });
  }

  public render(): ReactNode {
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
              {this.renderCommentForm()}
              {this.renderComments(book)}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  private renderCommentForm() {
    return (
      <form onSubmit={this.onCommentSumit}>
        <textarea
          name="comment"
          cols={60}
          rows={10}
          value={this.state.comment}
          onChange={this.onTextAreaChange}
          placeholder="type your comment"
          required
        />
        <div>
          <input type="submit" value="submit" />
        </div>
      </form>
    );
  }

  private renderComments(book: any) {
    return book.comments.length ? (
      <div>
        <ul>
          {book.comments.map((comment: any) => {
            return <li key={comment.id}>{comment.text}</li>;
          })}
        </ul>
        <button type="button" onClick={() => this.onLoadMore()}>
          Load More
        </button>
      </div>
    ) : (
      <p>No Comment</p>
    );
  }

  private onTextAreaChange(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    const { currentTarget } = evt;
    const comment = currentTarget.value;
    this.setState({ comment });
  }

  private onLoadMore() {
    const { offset, limit } = this.pagination;
    const nextOffset = offset + 1;
    this.props.onLoadMore({ id: this.props.match.params.id, offset: nextOffset, limit, skip: false });
  }

  private onAddToCartButtonClick() {
    this.props.addToCart();
  }

  private onCommentSumit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const form: HTMLFormElement = evt.currentTarget;
    const $comment = (form.elements as any).comment;
    const text = $comment.value.trim();

    this.props.addComment({ variables: { comment: { bookId: this.props.match.params.id, text } } }).then(res => {
      console.log('addComment res: ', res);
      this.setState({ comment: '' });
    });
  }
}

export default compose(
  withApollo,
  Q.bookById,
  M.addComment,
  Q.bookDetail,
  Q.commentsByPage,
  M.editComment,
  M.addToCart
)(BookDetail);
