import { getMainDefinition } from 'apollo-utilities';
import { split, Operation } from 'apollo-link';
import { ExecutableDefinitionNode } from 'graphql';

import { httpLink } from './http';
import { wsLink } from './ws';

function test({ query }: Operation): boolean {
  const def: ExecutableDefinitionNode = getMainDefinition(query);
  return def.kind === 'OperationDefinition' && def.operation === 'subscription';
}

const networkLink = split(test, wsLink, httpLink);

export { networkLink };
