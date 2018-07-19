const { graphiqlExpress } = require('apollo-server-express');

const { appConfig } = require('../../config');

const graphiqlExpressHandler = graphiqlExpress({
  endpointURL: appConfig.GRAPHQL_ENDPOINT,
  subscriptionsEndpoint: `ws://localhost:${appConfig.PORT}${appConfig.WS_PATH}`
});

exports.graphiqlExpressHandler = graphiqlExpressHandler;
