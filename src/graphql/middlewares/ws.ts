import { SubscriptionClient, ClientOptions } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';

import { config } from '../../config';

const clientOption: ClientOptions = {
  reconnect: true,
  connectionParams: {}
};

const subscriptionClient: SubscriptionClient = new SubscriptionClient(
  config.GRAPHQL_SUBSCRIPTION_ENDPOINT,
  clientOption
);

const wsLink: WebSocketLink = new WebSocketLink(subscriptionClient);

export { wsLink };
