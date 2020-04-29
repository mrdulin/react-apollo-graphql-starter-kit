import MockAWS from 'aws-sdk';
import { handler } from './';

jest.mock('aws-sdk', () => {
  const mComprehend = {
    startDominantLanguageDetectionJob: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return {
    Comprehend: jest.fn(() => mComprehend),
  };
});

describe('61497560', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return job id', async () => {
    const mComprehend = new MockAWS.Comprehend();
    const mResponse = { JobId: 1 };
    (mComprehend.startDominantLanguageDetectionJob().promise as jest.Mocked<any>).mockResolvedValueOnce(mResponse);
    const actual = await handler();
    expect(actual).toBe(1);
    expect(mComprehend.startDominantLanguageDetectionJob).toBeCalledWith({
      JobName: 'first-job',
      InputDataConfig: {
        S3Uri: 'input_bucket_name',
        InputFormat: 'ONE_DOC_PER_FILE',
      },
      OutputDataConfig: {
        S3Uri: 'output_bucket_name',
      },
      DataAccessRoleArn: 'role_arn',
    });
    expect(mComprehend.startDominantLanguageDetectionJob().promise).toBeCalledTimes(1);
  });

  it('should throw error', async () => {
    const mComprehend = new MockAWS.Comprehend();
    const mError = new Error('network');
    (mComprehend.startDominantLanguageDetectionJob().promise as jest.Mocked<any>).mockRejectedValueOnce(mError);
    await expect(handler()).rejects.toThrow('network');
    expect(mComprehend.startDominantLanguageDetectionJob).toBeCalledWith({
      JobName: 'first-job',
      InputDataConfig: {
        S3Uri: 'input_bucket_name',
        InputFormat: 'ONE_DOC_PER_FILE',
      },
      OutputDataConfig: {
        S3Uri: 'output_bucket_name',
      },
      DataAccessRoleArn: 'role_arn',
    });
    expect(mComprehend.startDominantLanguageDetectionJob().promise).toBeCalledTimes(1);
  });
});
