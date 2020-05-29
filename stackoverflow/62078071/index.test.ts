import { Scheduler } from '.';
import { CronJob } from 'cron';

jest.mock('cron', () => {
  const mScheduleJob = { start: jest.fn() };
  const mCronJob = jest.fn(() => mScheduleJob);
  return { CronJob: mCronJob };
});

describe('62078071', () => {
  it('should pass', () => {
    const mScheduleJob = new CronJob();
    const mDate = new Date(1995, 11, 17);
    const mScheduleFunction = jest.fn();
    Scheduler.scheduleJob(mDate, mScheduleFunction);
    expect(CronJob).toBeCalledWith(`0 0 0 17 11 0-6`, mScheduleFunction, undefined, true, 'Asia/Kolkata');
    expect(mScheduleJob.start).toBeCalledTimes(1);
  });
});
