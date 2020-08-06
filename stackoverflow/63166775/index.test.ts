import { init } from './';
import fun from './example';
import { mocked } from 'ts-jest/utils';

jest.mock('./example', () => jest.fn());

describe('63166775', () => {
  it('should pass', async () => {
    expect(jest.isMockFunction(fun)).toBeTruthy();
    const logSpy = jest.spyOn(console, 'log');
    mocked(fun).mockReturnValueOnce(true);
    await init({});
    expect(logSpy).toBeCalledWith('doSomething');
    expect(fun).toBeCalledTimes(1);
    logSpy.mockRestore();
  });
});
