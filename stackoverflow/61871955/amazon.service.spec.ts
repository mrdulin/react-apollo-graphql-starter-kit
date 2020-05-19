import * as AWS from 'aws-sdk';
import { AmazonService } from './amazon.service';
import { mocked } from 'ts-jest/utils';
import { AWSError } from 'aws-sdk';
import { GetParameterResult } from 'aws-sdk/clients/ssm';

jest.mock('aws-sdk', () => {
  const mSSMInstance = {
    getParameter: jest.fn(),
  };
  const mSSM = jest.fn(() => mSSMInstance);

  return { SSM: mSSM };
});

describe('amazon service mock', () => {
  let amazonService: AmazonService;

  it('should get Parameter from Parameter Store', async () => {
    amazonService = new AmazonService();
    expect(AWS.SSM).toBeCalled();
    const mSSMInstance = new AWS.SSM();
    const mData = {
      Parameter: {
        Name: 'NAME',
        Type: 'SecureString',
        Value: 'VALUE',
        Version: 1,
        LastModifiedDate: new Date(1995, 11, 17),
        ARN: 'arn:aws:ssm:eu-test-1:123:NAME',
      },
    };
    mocked(mSSMInstance.getParameter).mockImplementationOnce(
      (params, callback?: (err: AWSError | null, data: GetParameterResult) => void): any => {
        if (callback) {
          callback(null, mData);
        }
      },
    );
    const actual = await amazonService.getParam('NAME');
    expect(actual).toBe('VALUE');
  });
});
