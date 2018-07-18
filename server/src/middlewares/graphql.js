const { graphqlExpress } = require('apollo-server-express');

const { appConfig } = require('../config');
const { CNodeConnector } = require('../connectors/cnode');
const CNODE_MODELS = require('../models');
const { lowdb } = require('../database/lowdb');

function createGraphqlExpressHandler(opts) {
  return graphqlExpress(req => {
    const cnodeConnector = new CNodeConnector({
      API_ROOT_URL: appConfig.API_ROOT_URL
    });
    return {
      req,
      schema: opts.schema,
      context: {
        lowdb,
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
  });
}

exports.createGraphqlExpressHandler = createGraphqlExpressHandler;
