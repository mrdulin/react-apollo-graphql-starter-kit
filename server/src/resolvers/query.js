const { fakeDB } = require('../db');

exports.Query = {
  topics: (_, args, ctx) => {
    return ctx.topics.getHomeTopics(args.qs);
  },
  topic: (_, { id }, ctx) => {
    return ctx.topic.getTopicById(id);
  },
  books: () => {
    return fakeDB.books;
  },
  book: (root, { id }) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const bookFound = fakeDB.books.find(book => book.id === id);
        resolve(bookFound);
      }, 2000);
    });
    // return bookFound;
  },
  uploads: (root, args, context) => {
    const files = context.lowdb.get('uploads').value();
    return files;
  }
};
