const { withFilter } = require('graphql-subscriptions');

const { pubsub } = require('./mutation');

exports.Subscription = {
  messageAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator('messageAdded'),
      (payload, variables) => {
        return payload.bookId === variables.bookId;
      }
    )
  }
};
