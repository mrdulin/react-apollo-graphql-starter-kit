import { split } from 'apollo-link';

import { isUpload, uploadLink } from './upload';
import { networkLink } from './network';

const terminalLink = split(isUpload, uploadLink, networkLink);

export { terminalLink };
