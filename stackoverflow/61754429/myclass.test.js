import { MyClass } from './myclass';
import * as library from './library';

describe('61754429', () => {
  it('should pass', () => {
    jest.spyOn(library, 'const_function');
    const myclass = new MyClass();
    myclass.methodUnderTest();
    expect(library.const_function).toHaveBeenCalled();
    library.const_function.mockRestore();
  });
});
