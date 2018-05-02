const { Query } = require('./query');
const { Topic } = require('./topic');
const { Reply } = require('./reply');
const { Mutation } = require('./mutation');
const { Subscription } = require('./subscription');

const resolvers = {
  Query,
  Topic,
  Reply,
  Mutation,
  Subscription
};

exports.resolvers = resolvers;
