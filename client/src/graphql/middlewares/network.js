import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-boost';

import { httpLink } from './http';
import { wsLink } from './ws';

const networkLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

export { networkLink };
