import { OsEnvFetcher } from './';
import dotenv from 'dotenv';

describe('OsEnvFetcher', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should pass', () => {
    const mOutput = { error: new Error('parsed failure') };
    jest.spyOn(dotenv, 'config').mockReturnValueOnce(mOutput);
    const errorLogSpy = jest.spyOn(console, 'log');
    const exitStub = jest.spyOn(process, 'exit').mockImplementation();
    new OsEnvFetcher();
    expect(dotenv.config).toBeCalledTimes(1);
    expect(errorLogSpy).toBeCalledWith('Error loading .env file');
    expect(exitStub).toBeCalledWith(1);
  });
});
