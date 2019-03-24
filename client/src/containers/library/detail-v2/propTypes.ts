import * as PT from 'prop-types';

const book = PT.shape({ id: PT.string.isRequired, title: PT.string.isRequired, author: PT.string.isRequired });

const query = {
  data: PT.shape({ loading: PT.bool.isRequired, error: PT.any, bookById: book })
};

const mutation = {
  addToCart: PT.func
};

export { query, mutation };
