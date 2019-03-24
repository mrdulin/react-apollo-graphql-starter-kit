const config = {
  HOST: 'localhost',
  PORT: 3200,

  GRAPHQL_ROUTE: '/graphql',
  GRAPHQL_ENDPOINT: '',

  GRAPHQL_SUBSCRIPTION_ROUTE: '/subscriptions',
  GRAPHQL_SUBSCRIPTION_ENDPOINT: ''
};

config.GRAPHQL_ENDPOINT = `http://${config.HOST}:${config.PORT}${config.GRAPHQL_ROUTE}`;
config.GRAPHQL_SUBSCRIPTION_ENDPOINT = `ws://${config.HOST}:${config.PORT}${config.GRAPHQL_SUBSCRIPTION_ROUTE}`;

export { config };
