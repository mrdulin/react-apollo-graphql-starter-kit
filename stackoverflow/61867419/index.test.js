const myArray = [];
myArray.push(() => {
  console.log('first');
});
myArray.push(() => {
  console.log('second');
});

function main(funcs) {
  const first = funcs[0];
  const second = funcs[1];
  return first() + second();
}

describe('61867419', () => {
  it('should pass', () => {
    const mockFns = [jest.fn().mockReturnValueOnce(1), jest.fn().mockReturnValueOnce(2)];
    const actual = main(mockFns);
    expect(actual).toEqual(3);
    expect(mockFns[0]).toBeCalledTimes(1);
    expect(mockFns[1]).toBeCalledTimes(1);
  });
});
