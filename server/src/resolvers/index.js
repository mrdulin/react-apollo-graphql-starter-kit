const { Query } = require('./query');
const { Topic } = require('./topic');
const { Reply } = require('./reply');

const resolvers = {
  Query,
  Topic,
  Reply
};

exports.resolvers = resolvers;
