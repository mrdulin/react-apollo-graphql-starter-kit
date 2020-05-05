import A from './a';

describe('61596704', () => {
  it('should pass', () => {
    const mockedClassBInstance = {
      getName: jest.fn().mockReturnValueOnce('mocked name from b'),
    };
    const a = new A(mockedClassBInstance);
    const actual = a.getName();
    expect(actual).toEqual('mocked name from b');
  });
});
