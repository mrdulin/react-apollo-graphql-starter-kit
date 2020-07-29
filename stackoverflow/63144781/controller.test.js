const dao = require('./dao');
const controller = require('./controller');

jest.mock('./dao', () => {
  const mDao = { getProcess: jest.fn() };
  return jest.fn(() => mDao);
});

describe('63144781', () => {
  test('Testing mock::', () => {
    const daoIns = new dao();
    daoIns.getProcess.mockReturnValueOnce('mock');
    const result = controller.callDAOProcess();
    expect(result).toBe('mock');
  });
});
