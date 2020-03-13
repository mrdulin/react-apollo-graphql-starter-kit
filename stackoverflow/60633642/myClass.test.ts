import { myClass } from './myClass';

jest.mock('./myClass', () => {
  const { myClass: originalMyClass } = require.requireActual('./myClass');
  const mMyClass = {
    methodA: jest.fn().mockReturnValueOnce('mock a'),
    methodB: originalMyClass.prototype.methodB,
  };
  return { myClass: jest.fn(() => mMyClass) };
});

describe('60633642', () => {
  it('should mock methodA', () => {
    const c = new myClass();
    const actual = c.methodA();
    expect(jest.isMockFunction(c.methodA)).toBeTruthy();
    expect(actual).toBe('mock a');
    expect(c.methodA).toBeCalledTimes(1);
  });

  it('should call original methodB', () => {
    const c = new myClass();
    const actual = c.methodB();
    expect(jest.isMockFunction(c.methodB)).toBeFalsy();
    expect(actual).toBe('real b');
  });
});
