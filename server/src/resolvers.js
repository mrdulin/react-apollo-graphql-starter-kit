const { fakeDB } = require('./db');

const resolvers = {
  Query: {
    books: () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(fakeDB.books);
        }, 2000);
      });
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = args.book;
      newBook.id = Math.random() + '';
      fakeDB.books.push(newBook);
      return newBook;
    }
  }
};

exports.resolvers = resolvers;
