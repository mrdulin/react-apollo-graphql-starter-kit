const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const { apolloUploadExpress } = require('apollo-upload-server');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const config = require('../../webpack.config');
const { createWsServer } = require('./server');
const { appConfig } = require('./config');
const { schema } = require('./graphql/schema');
const { CNodeConnector, MongoConnector } = require('./graphql/connectors');
// const { MongoConnect } = require('./database/mongodb');
const { lowdb } = require('./database/lowdb');
// const { authMiddleware } = require('./middlewares');
const { Book, Topic, User } = require('./graphql/models');

const app = express();
const compiler = webpack(config);

// const Mongoose = MongoConnect();

createWsServer({
  app,
  port: appConfig.PORT,
  schema,
  wsPath: appConfig.WS_PATH
});

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);
app.use(cors());
// app.use(authMiddleware);

app.use(
  appConfig.GRAPHIQL_ENDPOINT,
  graphiqlExpress({
    endpointURL: appConfig.GRAPHQL_ENDPOINT,
    subscriptionsEndpoint: `ws://localhost:${appConfig.PORT}${appConfig.WS_PATH}`
  })
);

app.use(
  appConfig.GRAPHQL_ENDPOINT,
  bodyParser.json(),
  apolloUploadExpress(),
  graphqlExpress(req => {
    return {
      schema,
      context: {
        req,
        conn: {
          cnode: new CNodeConnector({ API_ROOT_URL: appConfig.API_ROOT_URL }),
          // mongo: new MongoConnector(Mongoose),
          lowdb
        },
        models: {
          Book: new Book(),
          Topic: new Topic(),
          User: new User()
        }
      },
      formatError: error => {
        const { code, message } = error.originalError;
        return { code, message };
      },
      tracing: true
    };
  })
);
