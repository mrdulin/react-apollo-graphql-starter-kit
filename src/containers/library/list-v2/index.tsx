import React, { PureComponent, ReactNode } from 'react';
import { graphql, compose, MutationFunc } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';

import * as PT from './propTypes';
import { BookList } from './components/BookList';
import { IBook } from '../../../types';
import * as Q from './query';
import * as M from './mutation';

interface ILibraryProps {
  data: any;
}

interface ILibraryMutations {
  addBook: MutationFunc;
}

interface ILibraryState {
  error: string;
}

type Props = Readonly<ILibraryProps & ILibraryMutations & RouteComponentProps>;
type State = Readonly<ILibraryState>;

class Library extends PureComponent<Props, State> {
  public static propTypes = {
    data: PT.query.data,
    history: PT.history,
    addBook: PT.mutation.addBook
  };

  public static defaultProps: Partial<Props> = {
    data: {}
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  public render(): ReactNode {
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

  private onBookClick(book: IBook) {
    this.props.history.push(`/book-detail/${book.id}`);
  }

  private onSubmit(evt: React.SyntheticEvent<HTMLFormElement>) {
    evt.preventDefault();
    const { currentTarget } = evt;
    const {
      elements: { bookName: bookNameInput, authorName: authorNameInput }
    } = currentTarget as any;
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
}

export default compose(
  Q.books,
  M.addBook
)(Library);
