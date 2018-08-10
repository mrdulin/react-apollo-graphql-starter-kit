import { HttpLink } from 'apollo-boost';
import { CONFIG } from '../../config';
const httpLink = new HttpLink({ uri: CONFIG.GRAPHQL_ENDPOINT });
export { httpLink };
