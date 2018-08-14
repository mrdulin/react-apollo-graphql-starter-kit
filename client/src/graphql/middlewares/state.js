import { withClientState } from 'apollo-link-state';

//TODO: 导入所有typeDefs, webpack
import { typeDefs } from '../typeDefs';
import { resolvers } from '../resolvers';

import { cache } from '../cache';
import { defaults } from '../state';

const stateLink = withClientState({ cache, typeDefs, resolvers, defaults });

export { stateLink };
