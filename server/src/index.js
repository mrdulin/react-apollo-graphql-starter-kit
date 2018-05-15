const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const cors = require('cors');

const config = require('../../webpack.config');

//cnodejs schema
const { CNodeConnector } = require('./connectors/cnode');
const CNODE_MODELS = require('./models');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const app = express();
const PORT = 3000;
const compiler = webpack(config);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use('*', cors({ origin: `http://localhost:${PORT}` }));
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
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
  })
);

const ws = createServer(app);

ws.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!\n`);
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: (connectionParams, webSocket, context) => {
        console.log('onConnect\n');
        console.log(connectionParams, context);
        return connectionParams;
      },
      onOperation: (message, params, webSocket) => {
        console.log('onOperation\n');
        // console.log(message, params, webSocket);
        console.log(message);
        return message;
      },
      onOperationDone: webSocket => {
        console.log('onOperationDone');
      },
      onDisconnect: (webSocket, context) => {
        console.log('onDisconnect\n');
      }
    },
    {
      server: ws,
      path: '/subscriptions'
    }
  );
});
