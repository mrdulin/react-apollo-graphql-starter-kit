import { createUploadLink } from 'apollo-upload-client';
import { HttpOptions } from 'apollo-link-http-common';
import { ApolloLink, Operation } from 'apollo-link';

import { config } from '../../config';

const httpOptions: HttpOptions = { uri: config.GRAPHQL_ENDPOINT };
const uploadLink: ApolloLink = createUploadLink(httpOptions);

const isFile = (value: any): boolean =>
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob) ||
  (typeof FileList !== 'undefined' && value instanceof FileList);

const isUpload = ({ variables }: Operation): boolean => Object.values(variables).some(isFile);

export { uploadLink, isFile, isUpload };
