import dotenv from 'dotenv';

export class OsEnvFetcher {
  constructor() {
    const output = dotenv.config();
    if (output.error) {
      console.log('Error loading .env file');
      process.exit(1);
    }
  }
}
