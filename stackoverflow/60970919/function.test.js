import { uploadToS3 } from './function';
import AWSMock from 'aws-sdk';

jest.mock('aws-sdk', () => {
  const mS3 = { upload: jest.fn().mockReturnThis(), promise: jest.fn() };
  return { S3: jest.fn(() => mS3) };
});

describe('60970919', () => {
  it('should pass', async () => {
    const mS3 = new AWSMock.S3();
    const mResponse = { Bucket: 'xxx' };
    mS3.upload({}).promise.mockResolvedValueOnce(mResponse);
    const actual = await uploadToS3({});
    expect(actual).toEqual(mResponse);
    expect(mS3.upload).toBeCalledWith({});
    expect(mS3.upload().promise).toBeCalled();
  });
});
