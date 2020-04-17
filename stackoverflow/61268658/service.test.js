const service = require('./service');
const repository = require('./repository');
const container = {};

describe('service', () => {
  it('should init', () => {
    let hello = repository(container);
    jest.spyOn(hello, 'makeBooking').mockReturnValueOnce('fake data');
    const actual = service.makeBooking(hello);
    expect(actual).toEqual('fake data');
    expect(hello.makeBooking).toBeCalledTimes(1);
  });
});
