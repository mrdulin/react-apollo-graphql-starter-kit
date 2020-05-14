import cron from 'node-cron';
import path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

jest.mock('node-cron', () => {
  return {
    schedule: jest.fn(),
  };
});

describe('61765291', () => {
  it('should pass', () => {
    const logSpy = jest.spyOn(console, 'log');
    cron.schedule.mockImplementationOnce(async (frequency, callback) => await callback());
    require('./cronJob');
    expect(logSpy).toBeCalledWith('DO SOME DATA PROCESSING');
    expect(cron.schedule).toBeCalledWith('30 00 * * *', expect.any(Function), {
      scheduled: 'true',
      timezone: 'America/Sao_Paulo',
    });
  });
});
