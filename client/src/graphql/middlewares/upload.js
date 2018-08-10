import { createUploadLink } from 'apollo-upload-client';
import { CONFIG } from '../../config';

const uploadLink = createUploadLink({ uri: CONFIG.GRAPHQL_ENDPOINT });

const isFile = value =>
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob) ||
  (typeof FileList !== 'undefined' && value instanceof FileList);

const isUpload = ({ variables }) => Object.values(variables).some(isFile);

export { uploadLink, isFile, isUpload };
