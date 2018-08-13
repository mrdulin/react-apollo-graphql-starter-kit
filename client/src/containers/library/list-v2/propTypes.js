import * as PT from 'prop-types';

const books = PT.arrayOf(
  PT.shape({ id: PT.string.isRequired, title: PT.string.isRequired, author: PT.string.isRequired })
);

const onBookClick = PT.func;

const history = PT.object;

const mutation = {
  addBook: PT.func
};

const query = {
  data: PT.shape({ loading: PT.bool.isRequired, error: PT.string, books })
};

export { books, query, onBookClick, history, mutation };
