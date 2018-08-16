const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const { apolloUploadExpress } = require('apollo-upload-server');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const path = require('path');

const config = require('../../webpack.config');
const { createWsServer } = require('./server');
const { appConfig } = require('./config');
const { schema } = require('./graphql/schema');
const { CNodeConnector } = require('./graphql/connectors');
const { lowdb, collections } = require('./database/lowdb');
const { Book, Topic, User, Upload, Comment } = require('./graphql/models');
const { bypassAuth } = require('./utils/auth');

const app = express();
const compiler = webpack(config);

const uploadDir = path.resolve(__dirname, '../../../../uploads');

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
    const user = bypassAuth(req);
    return {
      schema,
      context: {
        user,
        req,
        conn: {
          cnode: new CNodeConnector({ API_ROOT_URL: appConfig.API_ROOT_URL }),
          lowdb
        },
        models: {
          Book: new Book({ collectionName: collections.books.name, user }),
          Comment: new Comment({ collectionName: collections.comments.name, user }),
          Topic: new Topic(),
          User: new User({ collectionName: collections.users.name }),
          Upload: new Upload({ uploadDir, user })
        }
      },
      formatError: error => {
        console.log('formatError');
        if (error.originalError) {
          const { code, message } = error.originalError;
          return { code, message };
        }

        return error;
      },
      tracing: true
    };
  })
);
