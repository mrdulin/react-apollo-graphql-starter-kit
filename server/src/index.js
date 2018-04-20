const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const config = require('../../webpack.config');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

const app = express();
const compiler = webpack(config);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!\n');
});
