import * as Q from '../queries/library.gql';

const resolvers = {
  Mutation: {
    addToCart: (_, { book }, { cache }) => {
      const query = Q.CART;

      const previousState = cache.readQuery({ query });

      const prevBook = previousState.cart.books.find(cacheBook => cacheBook.id === book.id);

      const nextBook = {
        ...book,
        count: prevBook ? prevBook.count++ : 1,
        __typename: 'Book'
      };

      const data = {
        cart: {
          ...previousState.cart,
          books: previousState.cart.books.concat([nextBook])
        }
      };

      cache.writeData({ query, data });
      return nextBook;
    }
  }
};

export { resolvers };
