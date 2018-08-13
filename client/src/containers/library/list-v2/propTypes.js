import * as PT from 'prop-types';

const book = PT.shape({ id: PT.string.isRequired, title: PT.string.isRequired, author: PT.string.isRequired });
const books = PT.arrayOf(book);

const onBookClick = PT.func;

const mutation = {
  addBook: PT.func
};

const query = {
  data: PT.shape({ loading: PT.bool.isRequired, error: PT.object, books })
};

export { books, query, onBookClick, mutation };
export * from '../../../shared/propTypes';
