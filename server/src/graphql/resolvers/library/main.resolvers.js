const shortid = require('shortid');
const { PubSub, withFilter } = require('graphql-subscriptions');

const pubsub = new PubSub();

module.exports = {
  Query: {
    books: (root, args, ctx) => {
      return ctx.lowdb.get('books').value();
    },
    book: (root, { id }, ctx) => {
      return ctx.lowdb
        .get('books')
        .find({ id })
        .value();
    }
  },
  Mutation: {
    addBook: (root, args, context) => {
      const { book } = args;
      book.id = shortid.generate();
      book.messages = [];
      return context.lowdb
        .get('books')
        .push(book)
        .last()
        .write();
    },
    addMessage: (root, { message }, context) => {
      const book = context.lowdb
        .get('books')
        .find({ id: message.bookId })
        .value();
      if (!book) throw new Error('book does not exist');
      const messageId = shortid.generate();
      const newMessage = { id: messageId, text: message.text };

      pubsub.publish('messageAdded', { messageAdded: newMessage, bookId: message.bookId });

      return context.lowdb
        .get('books')
        .find({ id: message.bookId })
        .get('messages')
        .push(newMessage)
        .last()
        .write();
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('messageAdded'),
        (payload, variables) => {
          return payload.bookId === variables.bookId;
        }
      )
    }
  }
};
