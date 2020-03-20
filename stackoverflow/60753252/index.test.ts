import { invokeLambda } from './';
import { Lambda as LambdaMock } from 'aws-sdk';

jest.mock('aws-sdk', () => {
  const mLambda = { invoke: jest.fn() };
  return { Lambda: jest.fn(() => mLambda) };
});

describe('Mock Lambda', () => {
  it('should invoke lambda', async () => {
    const mLambda = new LambdaMock();
    const mResult = {};
    (mLambda.invoke as jest.Mocked<any>).mockImplementationOnce((params, callback) => {
      callback(null, mResult);
    });
    const actual = await invokeLambda({});
    expect(actual).toEqual({});
    expect(LambdaMock).toBeCalledWith({ region: 'ap-southeast-1', endpoint: undefined });
    expect(mLambda.invoke).toBeCalledWith(
      {
        FunctionName: 'MyLambaInvocation',
        Payload: JSON.stringify({}),
      },
      expect.any(Function),
    );
  });

  it('should handle error if invoke failure', async () => {
    const mLambda = new LambdaMock();
    const mError = new Error('network');
    (mLambda.invoke as jest.Mocked<any>).mockImplementationOnce((params, callback) => {
      callback(mError);
    });
    await expect(invokeLambda({})).rejects.toThrow('network');
    expect(LambdaMock).toBeCalledWith({ region: 'ap-southeast-1', endpoint: undefined });
    expect(mLambda.invoke).toBeCalledWith(
      {
        FunctionName: 'MyLambaInvocation',
        Payload: JSON.stringify({}),
      },
      expect.any(Function),
    );
  });
});
