const repository = require('.');

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
});
