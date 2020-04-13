const { findById } = require('./');
const AWS = require('aws-sdk');

jest.mock('aws-sdk', () => {
  const mDynamoDB = { getItem: jest.fn().mockReturnThis(), promise: jest.fn() };
  return { DynamoDB: jest.fn(() => mDynamoDB) };
});

describe('61157392', () => {
  let dynamodb;
  beforeAll(() => {
    dynamodb = new AWS.DynamoDB();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should pass', async () => {
    dynamodb.getItem().promise.mockResolvedValueOnce({ rows: [] });
    const actual = await findById('1');
    expect(actual).toEqual({ rows: [] });
    expect(dynamodb.getItem).toBeCalledWith({
      TableName: 'table-name',
      Key: {
        id: { S: '1' },
      },
    });
    expect(dynamodb.getItem().promise).toBeCalledTimes(1);
  });
});
