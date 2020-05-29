import { CronCommand, CronJob } from 'cron';

// ************* Scheduler Configuration ***************
const TIMEZONE = 'Asia/Kolkata';
// *****************************************************

export class Scheduler {
  static scheduleJob = (scheduleDate: Date, scheduleFunction: CronCommand) => {
    const date = new Date(scheduleDate);
    const scheduleJob = new CronJob(
      `0 0 0 ${date.getDate()} ${date.getMonth()} 0-6`,
      scheduleFunction,
      undefined,
      true,
      TIMEZONE,
    );
    scheduleJob.start();
  };
}
