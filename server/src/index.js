const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const { apolloUploadExpress } = require('apollo-upload-server');

const config = require('../../webpack.config');
const { createWsServer } = require('./server');
const { appConfig } = require('./config');
const { schema } = require('./graphql/schema');
const { graphiqlExpressHandler, createGraphqlExpressHandler } = require('./graphql/middlewares');

const app = express();
const compiler = webpack(config);

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
app.use(appConfig.GRAPHQL_ENDPOINT, bodyParser.json(), apolloUploadExpress(), createGraphqlExpressHandler({ schema }));
app.use(appConfig.GRAPHIQL_ENDPOINT, graphiqlExpressHandler);
