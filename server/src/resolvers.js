const { fakeDB } = require('./db');

const resolvers = {
  Query: {
    books: () => {
      return fakeDB.books;
    },
    book: (root, { id }) => {
      const bookFound = fakeDB.books.find(book => book.id === id);
      return bookFound;
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = args.book;
      newBook.id = Math.round(Math.random() * 1000000);
      fakeDB.books.push(newBook);
      return newBook;
    },
    addMessage: (root, { message }) => {
      const bookFound = fakeDB.books.find(book => book.id === message.bookId);
      if (!bookFound) throw new Error('book does not exist');
      const messageId = bookFound.messages.length + 1;
      const newMessage = { id: String(messageId), text: message.text };
      bookFound.messages.push(newMessage);
      return newMessage;
    }
  }
};

exports.resolvers = resolvers;
