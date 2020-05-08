const timeContent = require('./main');

describe('1010000022139507', () => {
  it('should pass', () => {
    const mockedDate = new Date(2020, 4, 9, 0, 0);
    const DateMock = jest.spyOn(global, 'Date').mockImplementationOnce(() => mockedDate);
    const actual = timeContent();
    expect(actual).toBe('距离周末还有0天');
    DateMock.mockRestore();
  });

  it('should pass 2', () => {
    const mockedDate = new Date(2020, 4, 8, 0, 0);
    const DateMock = jest.spyOn(global, 'Date').mockImplementationOnce(() => mockedDate);
    const actual = timeContent();
    expect(actual).toBe('距离周末还有<span>0天23时59分59秒</span>');
    DateMock.mockRestore();
  });
});
