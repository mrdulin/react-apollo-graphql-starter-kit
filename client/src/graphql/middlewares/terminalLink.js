import { split } from 'apollo-boost';

import { isUpload, uploadLink } from './upload';
import { networkLink } from './network';

const terminalLink = split(isUpload, uploadLink, networkLink);

export { terminalLink };
