const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const config = require('../../webpack.config');

//cnodejs schema
const { CNodeConnector } = require('./connectors/cnode');
const CNODE_MODELS = require('./models');
const { typeDefs } = require('./schema');
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
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => {
    const cnodeConnector = new CNodeConnector({
      API_ROOT_URL: 'https://cnodejs.org/api/v1'
    });
    return {
      req,
      schema,
      context: {
        topic: new CNODE_MODELS.Topic(
          null,
          {
            Author: CNODE_MODELS.Author,
            Topics: CNODE_MODELS.Topics
          },
          cnodeConnector
        ),
        topics: new CNODE_MODELS.Topics(
          {
            Topic: CNODE_MODELS.Topic,
            Author: CNODE_MODELS.Author
          },
          cnodeConnector
        )
      },
      tracing: true
    };
  })
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!\n');
});
