import { Connector, DbConnector } from './dbConnector';

export class DBService {
  private connector: Connector;
  constructor() {
    this.connector = DbConnector.getInstance();
    this.connector.connect();
  }

  public async saveData() {
    const collName = 'collName';
    const condition = 'condition';
    const update = {};
    const options = {};
    return this.connector.update(collName, condition, update, options).then((reconds) => {
      return reconds;
    });
  }
}
