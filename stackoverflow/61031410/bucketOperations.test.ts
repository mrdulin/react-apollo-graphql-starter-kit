import pump from 'pump';
import fs from 'fs';
import { GcloudAuthenticationInstance } from './gcloudAuthenticationInstance';

jest.mock('pump', () => {
  const mPump = { on: jest.fn() };
  return jest.fn(() => mPump);
});

describe('61031410', () => {
  let originalEnv;
  beforeEach(() => {
    originalEnv = process.env;
  });
  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });
  it('should upload file correctly', async () => {
    process.env.ENV_NAME_DEV = 'dev';
    process.env.GCLOUD_ENV_STR_BUCKET_NAME = 'bucket-dev';
    process.env.GCLOUD_UPLOAD_FILE_DEV_LOCAL_PATH = 'dev';
    process.env.GCLOUD_DATABASE_BUCKET_DEV = 'bucket-dev-db';
    const BucketOperations = require('./bucketOperations');
    const createReadStreamSpy = jest.spyOn(fs, 'createReadStream').mockReturnValueOnce('rs' as any);
    const mStorage: any = {
      bucket: jest.fn().mockReturnThis(),
      file: jest.fn().mockReturnThis(),
      createWriteStream: jest.fn().mockReturnValueOnce('ws'),
    };
    const infoSpy = jest.spyOn(console, 'info');
    const createGcloudAuthenticationBucketSpy = jest
      .spyOn(GcloudAuthenticationInstance, 'createGcloudAuthenticationBucket')
      .mockReturnValueOnce(mStorage);
    pump().on.mockImplementation(function(this: any, event, callback) {
      if (event === 'finish') {
        callback();
      }
      return this;
    });
    const actual = await BucketOperations.uploadEnvFiles('dev');
    expect(actual).toEqual({ status: 'Success', code: 201, error: null });
    expect(createGcloudAuthenticationBucketSpy).toBeCalledTimes(1);
    expect(pump).toBeCalledWith('rs', 'ws');
    expect(createReadStreamSpy).toBeCalledWith('dev');
    expect(mStorage.bucket).toBeCalledWith('bucket-dev');
    expect(mStorage.file).toBeCalledWith('bucket-dev-db');
    expect(mStorage.createWriteStream).toBeCalledWith({ gzip: true, public: true, resumable: true });
    expect(infoSpy.mock.calls[0]).toEqual(['after authentication']);
    expect(infoSpy.mock.calls[1]).toEqual(['Successfully uploaded the file']);
  });
  it('should handle the error if upload file failure', () => {
    // TODO: you can do this like above
  });
});
