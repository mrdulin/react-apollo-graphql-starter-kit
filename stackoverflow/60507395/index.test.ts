import { MyClass } from './';

describe('60507395', () => {
  it('should add object', () => {
    const myClass = new MyClass();
    const pushSpy = jest.spyOn(myClass['objects'], 'push');
    myClass.addObject({});
    expect(pushSpy).toBeCalledWith({});
    expect(myClass['objects']).toHaveLength(1);
  });
});
