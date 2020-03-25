import { MyClass } from './';
import { MyLib } from './MyLib';

describe('60840838', () => {
  it('should pass', () => {
    const firstMethodSpy = jest.spyOn(MyLib.prototype, 'firstMethod').mockImplementationOnce((callback) => {
      callback('arg');
    });
    const secondMethodSpy = jest.spyOn(MyLib.prototype, 'secondMethod').mockReturnValueOnce('fake');
    const instance = new MyClass();
    instance.myMainMethod('param');
    expect(firstMethodSpy).toBeCalledWith(expect.any(Function));
    expect(secondMethodSpy).toBeCalledWith('arg');
  });
});
