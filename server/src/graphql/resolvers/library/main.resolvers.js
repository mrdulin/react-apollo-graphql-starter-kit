const { PubSub, withFilter } = require('graphql-subscriptions');
const { AppError } = require('../../../utils/error');

const pubsub = new PubSub();

module.exports = {
  Query: {
    books: (_, args, { models, conn, user }) => {
      if (!user) {
        throw new AppError(AppError.Unauthorized);
      }
      return models.Book.getAll({ models, conn });
    },
    bookById: (_, { id }, ctx) => {
      return ctx.models.Book.getById(id, ctx);
    },
    commentsByPage: (_, { id, offset, limit }, { models, conn, user }) => {
      if (!user) {
        throw new AppError(AppError.Unauthorized);
      }
      return models.Comment.getByPage({ id, offset, limit }, { conn });
    }
  },
  Mutation: {
    addBook: (_, { book }, ctx) => {
      return ctx.models.Book.create(book, ctx);
    },
    addComment: (_, { comment }, { models, conn, user }) => {
      if (!user) {
        throw new AppError(AppError.Unauthorized);
      }
      return models.Comment.create(comment, models, conn);
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
