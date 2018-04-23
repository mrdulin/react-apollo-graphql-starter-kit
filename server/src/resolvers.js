const { fakeDB } = require('./db');

const resolvers = {
  Query: {
    books: () => {
      // return new Promise(resolve => {
      //   setTimeout(() => {
      //     resolve(fakeDB.books);
      //   }, 2000);
      // });
      return fakeDB.books;
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = args.book;
      newBook.id = Math.round(Math.random() * 1000000);
      fakeDB.books.push(newBook);
      return newBook;
    }
  }
};

exports.resolvers = resolvers;
