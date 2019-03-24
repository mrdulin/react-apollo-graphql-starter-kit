import { HttpLink, FetchOptions } from 'apollo-link-http';

import { config } from '../../config';

const fetchOption: FetchOptions = { uri: config.GRAPHQL_ENDPOINT };
const httpLink: HttpLink = new HttpLink(fetchOption);

export { httpLink };
