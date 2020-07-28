import { listen } from './rdkafka';

export class UserData {
  unsubscribe: any;
  config: any;

  constructor() {
    this.config = {
      name: 'msgHandler',
    };
  }
  private processMsg = (value): void => {
    console.log('param value', value.toString());
    this.unsubscribe();
  };
  getData = (): void => {
    this.unsubscribe = listen({
      name: this.config.name,
      processMessage: this.processMsg,
    });
  };
}
