const UtilsModule = require('./utilsModule');

describe('62736904', () => {
  it('testing function', async () => {
    const PAYLOAD = {};
    const DATE = '2020-07-20';

    const SpyGetIntervalDates = jest.spyOn(UtilsModule, 'getIntervalDates');
    SpyGetIntervalDates.mockImplementation(() => Promise.resolve({ minAge: '2020-08-04' }));

    const nextDate = await UtilsModule.nextDates(DATE, PAYLOAD);
    expect(nextDate).toEqual({ minAge: '2020-08-04' });
  });
});
