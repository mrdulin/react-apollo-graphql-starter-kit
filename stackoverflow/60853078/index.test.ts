import { B } from './';

describe('60853078', () => {
  it('should pass', () => {
    const doSomethingStub = jest.spyOn(B.prototype, 'doSomething').mockReturnValueOnce();
    const b = new B();
    b.doSomethingElse();
    expect(doSomethingStub).toBeCalledTimes(1);
    doSomethingStub.mockRestore();
  });
});
