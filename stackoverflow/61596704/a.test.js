import A from './a';
import B from './b';
jest.mock('./b');

describe('61596704', () => {
  it('should pass', () => {
    const mockedClassBInstance = new B();
    mockedClassBInstance.getName.mockReturnValueOnce('mocked name from b');
    const a = new A(mockedClassBInstance);
    const actual = a.getName();
    expect(actual).toEqual('mocked name from b');
  });

  it('getAge method of B should be mocked as well', () => {
    const mockedClassBInstance = new B();
    jest.isMockFunction(mockedClassBInstance.getAge);
  });
});
