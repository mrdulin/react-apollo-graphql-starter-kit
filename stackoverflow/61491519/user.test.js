import MockSES from 'aws-sdk/clients/ses';
import { user } from './user';

jest.mock('aws-sdk/clients/ses', () => {
  const mSES = {
    sendTemplatedEmail: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return jest.fn(() => mSES);
});

describe('61491519', () => {
  test('Should error when ses.sendTemplatedEmail.promise() fails', async () => {
    const mSes = new MockSES();
    const mError = new Error('This is an SES error');
    mSes.sendTemplatedEmail().promise.mockRejectedValueOnce(mError);
    const mockRequest = {};
    const mockResponse = {};
    const mockNext = jest.fn();
    await user.forgotPassword(mockRequest, mockResponse, mockNext);

    expect(MockSES).toBeCalledWith({ apiVersion: '2010-12-01' });
    expect(mSes.sendTemplatedEmail).toBeCalledWith({
      Source: 'Sender Name <sender@recipient.com>',
      Destination: {
        ToAddresses: [],
      },
      Template: 'tpl',
      TemplateData: 'data',
    });
    expect(mSes.sendTemplatedEmail().promise).toBeCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith('internalErrorMessage');
  });
});
