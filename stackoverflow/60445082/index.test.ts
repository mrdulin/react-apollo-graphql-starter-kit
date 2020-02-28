import { someFunc } from './';
import { S3Client } from './s3client';

jest.mock('./s3client', () => {
  const mS3Client = { getFile: jest.fn() };
  return { S3Client: jest.fn(() => mS3Client) };
});

describe('Test Suite', () => {
  let mockedClient: jest.Mocked<S3Client>;
  beforeAll(() => {
    mockedClient = new S3Client() as any;
    mockedClient.getFile.mockImplementation(() => Promise.resolve('hello'));
  });
  it('testCase', async () => {
    const req = {
      key: ['value'],
    };
    await someFunc(req, null, null);
    expect(mockedClient.getFile).toBeCalledWith('a', 'b');
  });
});
