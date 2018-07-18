const { makeExecutableSchema } = require('graphql-tools');

//cnodejs schema
const { typeDefs } = require('./schemas');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

exports.schema = schema;
