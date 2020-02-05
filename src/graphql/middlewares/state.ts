import { withClientState, ClientStateConfig } from 'apollo-link-state';

// TODO: 导入所有typeDefs, webpack

import { typeDefs } from '../typeDefs';
import { resolvers } from '../resolvers';

import { cache } from '../cache';
import { defaults } from '../state';

const clientStateConfig: ClientStateConfig = { cache, typeDefs, resolvers, defaults };
const stateLink = withClientState(clientStateConfig);

export { stateLink };
