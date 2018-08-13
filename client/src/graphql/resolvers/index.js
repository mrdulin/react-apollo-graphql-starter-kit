import * as Q from '../queries/library.gql';

const resolvers = {
  Query: {
    bookCountById: (_, { id }, { cache }) => {
      const state = cache.readQuery({ query: Q.CART });
      const { cart } = state;
      const book = cart.books.find(cacheBook => cacheBook.id === id);
      if (book) {
        return book.count;
      }
      return 0;
    }
  },
  Mutation: {
    addToCart: (_, { book }, { cache }) => {
      const query = Q.CART;

      const previousState = cache.readQuery({ query });

      const prevBook = previousState.cart.books.find(cacheBook => cacheBook.id === book.id);

      const count = prevBook ? prevBook.count + 1 : 1;

      const nextBook = {
        ...book,
        count,
        __typename: 'Book'
      };

      const data = {
        cart: {
          ...previousState.cart,
          books: prevBook ? [nextBook] : previousState.cart.books.concat([nextBook])
        }
      };

      cache.writeData({ query, data });
      return nextBook;
    }
  }
};

export { resolvers };
