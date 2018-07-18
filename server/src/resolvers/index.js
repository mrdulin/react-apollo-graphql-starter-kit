const { GraphQLUpload } = require('apollo-upload-server');

const { Query } = require('./query');
const { Topic } = require('./topic');
const { Reply } = require('./reply');
const { Mutation } = require('./mutation');
const { Subscription } = require('./subscription');

const resolvers = {
  Upload: GraphQLUpload,
  Query,
  Topic,
  Reply,
  Mutation,
  Subscription
};

exports.resolvers = resolvers;
