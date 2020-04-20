import { ClassA } from './classA';

describe('61315546', () => {
  it('Sample Test', async () => {
    const spyOn1 = jest.spyOn(ClassA.prototype, 'methodB');
    spyOn1.mockImplementation(() => {
      return () => {};
    });
    const spyOn2 = jest.spyOn(ClassA.prototype, 'methodC');
    spyOn2.mockImplementation(() => {
      return () => {};
    });

    const classA = new ClassA();
    expect(classA.methodA()).toEqual('ClassA');
  });
});
