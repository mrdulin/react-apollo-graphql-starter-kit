const repository = require('./repository');

const container = {};

describe('Repository', () => {
  it('should connect with a container', () => {
    let hello = repository(container);

    expect(hello).toMatchObject({
      makeBooking: expect.any(Function),
      getOrderById: expect.any(Function),
      generateTicket: expect.any(Function),
      disconnect: expect.any(Function),
    });
  });

  it('should generate ticket', () => {
    let hello = repository(container);
    const logSpy = jest.spyOn(console, 'log');
    hello.generateTicket();
    expect(logSpy).toBeCalledWith('generate ticket function called');
  });

  // rest test cases same as above
});
