import fs from 'fs';
import pump from 'pump';
import { GcloudAuthenticationInstance } from './gcloudAuthenticationInstance';
import { AppUtilServiceInstance } from './appUtilServiceInstance';

const {
  GCLOUD_ENV_STR_BUCKET_NAME,
  GCLOUD_UPLOAD_FILE_DEV_LOCAL_PATH,
  GCLOUD_UPLOAD_FILE_PROD_LOCAL_PATH,
  GCLOUD_DATABASE_BUCKET_DEV,
  GCLOUD_DATABASE_BUCKET_PROD,
  ENV_NAME_DEV,
} = process.env;

export const uploadEnvFiles = async (env_name: string) => {
  return new Promise(async (res, rej) => {
    const str = GcloudAuthenticationInstance.createGcloudAuthenticationBucket();

    const bucketToUpload = GCLOUD_ENV_STR_BUCKET_NAME;
    let uploadLocalFilePath;
    let destinationBucketPath;
    if (!AppUtilServiceInstance.isNullOrUndefined(env_name)) {
      uploadLocalFilePath =
        ENV_NAME_DEV === env_name ? GCLOUD_UPLOAD_FILE_DEV_LOCAL_PATH : GCLOUD_UPLOAD_FILE_PROD_LOCAL_PATH;
      destinationBucketPath = ENV_NAME_DEV === env_name ? GCLOUD_DATABASE_BUCKET_DEV : GCLOUD_DATABASE_BUCKET_PROD;
    }
    console.info('after authentication');
    pump(
      fs.createReadStream(uploadLocalFilePath),
      str
        .bucket(bucketToUpload)
        .file(destinationBucketPath)
        .createWriteStream({
          gzip: true,
          public: true,
          resumable: true,
        }),
    )
      .on('error', (err) => {
        console.error('Error occured in uploading:', err);
        rej({ status: 'Error', error: err, code: 500 });
      })
      .on('finish', () => {
        console.info('Successfully uploaded the file');
        res({ status: 'Success', code: 201, error: null });
      });
  });
};
