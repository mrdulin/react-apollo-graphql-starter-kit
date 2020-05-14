import cron from 'node-cron';

class CronJob {
  constructor() {
    this.startJob();
  }

  async startJob() {
    cron.schedule(
      process.env.FREQUENCY_CRON,
      async () => {
        console.log('DO SOME DATA PROCESSING');
      },
      {
        scheduled: process.env.SCHEDULED,
        timezone: process.env.TIMEZONE,
      },
    );
  }
}

export default new CronJob();
