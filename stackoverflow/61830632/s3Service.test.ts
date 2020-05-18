import { S3Service } from './s3Service';

const mS3Instance = {
  upload: jest.fn().mockReturnThis(),
  promise: jest.fn(),
};

jest.mock('aws-sdk', () => {
  return { S3: jest.fn(() => mS3Instance) };
});

describe('61830632', () => {
  it('should upload correctly', async () => {
    const configService = {
      get: jest
        .fn()
        .mockReturnValueOnce('accessKeyId')
        .mockReturnValueOnce('secretAccessKey')
        .mockReturnValueOnce('us-east')
        .mockReturnValueOnce('bucket-dev'),
    };
    mS3Instance.promise.mockResolvedValueOnce('fake response');
    const s3Service = new S3Service(configService);
    const actual = await s3Service.upload('name', 'contentType', Buffer.from('ok'));
    expect(actual).toEqual('fake response');
    expect(mS3Instance.upload).toBeCalledWith({ Bucket: 'bucket-dev', Key: 'key', Body: Buffer.from('ok') });
  });
});
