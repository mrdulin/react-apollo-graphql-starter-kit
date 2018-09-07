const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');

function createWsServer(options) {
  const { app, port, schema, wsPath } = options;
  const httpServer = createServer(app);

  return httpServer.listen(port, () => {
    console.log(`subscriptions transport ws listening on port ${port}!\n`);
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: (connectionParams, webSocket, context) => {
          console.log('onConnect\n');
          // console.log(connectionParams, context);
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
        server: httpServer,
        path: wsPath
      }
    );
  });
}

exports.createWsServer = createWsServer;
