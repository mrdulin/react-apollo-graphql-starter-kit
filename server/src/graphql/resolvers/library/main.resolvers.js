const { PubSub, withFilter } = require('graphql-subscriptions');
const { auth } = require('../../../utils/auth');

const pubsub = new PubSub();

module.exports = {
  Query: {
    books: (_, args, { models, conn, req }) => {
      if (auth(req)) {
        return models.Book.getAll({ models, conn });
      }
    },
    bookById: (_, { id }, ctx) => {
      return ctx.models.Book.getById(id, ctx);
    },
    commentsByPage: (_, { id, offset, limit }, { models, conn, req }) => {
      if (auth(req)) {
        return models.Comment.getByPage({ id, offset, limit }, { conn });
      }
    }
  },
  Mutation: {
    addBook: (_, { book }, ctx) => {
      return ctx.models.Book.create(book, ctx);
    },
    addComment: (_, { comment }, { models, conn, req }) => {
      if (auth(req)) {
        return models.Comment.create(comment, models, conn);
      }
    }
  },
  Subscription: {
    addComment: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['addComment']),
        (payload, variables) => {
          return payload.bookId === variables.bookId;
        }
      )
    }
  }
};
