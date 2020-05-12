import { handler } from './handler';
import AWSMock from 'aws-sdk';

jest.mock('aws-sdk', () => {
  const putObjectOutputMock = {
    promise: jest.fn(),
  };
  const putObjectMock = jest.fn(() => putObjectOutputMock);

  const deleteObjectOutputMock = {
    promise: jest.fn(),
  };
  const deleteObjectMock = jest.fn(() => deleteObjectOutputMock);

  const mS3 = {
    deleteObject: deleteObjectMock,
    putObject: putObjectMock,
  };
  return { S3: jest.fn(() => mS3) };
});

describe('61719699', () => {
  it('should delete object and put object', async () => {
    const mS3 = new AWSMock.S3();
    const mPutObjectResponse = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: undefined,
    };
    mS3.putObject().promise.mockResolvedValueOnce(mPutObjectResponse);

    const mEvent = { queryStringParameters: { value: 'test' }, body: { newStuff: 'stuff goes here', eventList: [] } };
    const returnValue = await handler(mEvent);
    expect(returnValue).toEqual({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: undefined,
    });
    expect(mS3.deleteObject).toBeCalledWith({ Bucket: 'my-bucket-name', Key: 'name-of-object' });
    expect(mS3.deleteObject().promise).toBeCalled();
    expect(mS3.putObject).toBeCalledWith({
      Bucket: 'my-bucket-name',
      Key: 'name-of-object',
      ContentType: 'application/json',
      Body: { newStuff: 'stuff goes here', eventList: [] },
    });
  });
});
