import * as Q from '../queries/library.gql';
import { defaults } from '../state';

const findBookById = (books, id) => books.find(book => book.id === id);

const resolvers = {
  Book: {
    count: () => 0
  },
  Query: {},
  Mutation: {
    addToCart: (_, { book }, { cache }) => {
      const query = Q.CART;
      const prevState = cache.readQuery({ query });
      const prevBook = findBookById(prevState.cart.books, book.id);
      const count = prevBook ? prevBook.count + 1 : 1;

      if (count > 5) {
        return book;
      }

      const nextBook = {
        ...book,
        count,
        __typename: 'Book'
      };

      const data = {
        cart: {
          ...prevState.cart,
          books: prevBook
            ? prevState.cart.books.map(cacheBook => (cacheBook.id === book.id ? nextBook : cacheBook))
            : prevState.cart.books.concat([nextBook])
        }
      };

      cache.writeQuery({ query, data });
      return nextBook;
    },

    removeCountFromCart(_, { book }, { cache }) {
      const query = Q.CART;
      const prevState = cache.readQuery({ query });
      const prevBook = findBookById(prevState.cart.books, book.id);
      const count = prevBook.count - 1;

      if (count < 1) {
        return null;
      }

      const data = {
        cart: {
          ...prevState.cart,
          books: prevState.cart.books.map(cacheBook => (cacheBook.id === book.id ? { ...cacheBook, count } : cacheBook))
        }
      };

      cache.writeQuery({ query, data });
      return null;
    },

    removeFromCart: (_, { book }, { cache }) => {
      const query = Q.CART;
      const prevState = cache.readQuery({ query });
      const nextBooks = prevState.cart.books.filter(cacheBook => cacheBook.id !== book.id);

      const data = {
        cart: {
          ...prevState.cart,
          books: nextBooks
        }
      };

      cache.writeQuery({ query, data });
      return null;
    },

    removeAllFromCart: (_, args, { cache }) => {
      cache.writeData({ data: defaults });
      return null;
    },

    editComment: (_, { text }, { cache }) => {
      const data = { bookDetail: { comment: text, __typename: 'BookDetail' } };
      cache.writeData({ data });
      return null;
    }

    // addMoreCommentsToBook: (_, { id, comments }, { cache }) => {
    //   const data = cache.readQuery({ query: Q.BOOK_BY_ID });
    //   debugger;
    //   return null;
    // }
  }
};

export { resolvers };
