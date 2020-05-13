import * as library from './library';

describe('61754429', () => {
  it('should pass', () => {
    jest.spyOn(library, 'const_function');
    library.const_function();
    expect(library.const_function).toHaveBeenCalled();
    library.const_function.mockRestore();
  });
});
