import { UserData } from './userdata';
import { listen } from './rdkafka';
import { mocked } from 'ts-jest/utils';

jest.mock('./rdkafka');

describe('63123784', () => {
  let userData: UserData;
  beforeEach(() => {
    userData = new UserData();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('should pass', () => {
    expect(jest.isMockFunction(listen)).toBeTruthy();
    expect(userData.getData()).toBeUndefined();
  });
  it('should process message', () => {
    let processMessageRef;
    const mUnsubscribe = jest.fn();
    mocked(listen).mockImplementationOnce((opts) => {
      processMessageRef = opts.processMessage;
      return mUnsubscribe;
    });
    const logSpy = jest.spyOn(console, 'log');
    userData.getData();
    processMessageRef(1);
    expect(listen).toBeCalledWith({ name: 'msgHandler', processMessage: processMessageRef });
    expect(mUnsubscribe).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith('param value', '1');
  });
});
