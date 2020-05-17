export interface Connector {
  connect(): void;
  update(collName, condition, update, options): Promise<any>;
}

export class DbConnector implements Connector {
  public static connector: Connector;
  public static getInstance() {
    if (this.connector) {
      return this.connector;
    }
    this.connector = new DbConnector();
    return this.connector;
  }
  private constructor() {}
  public connect() {
    console.log('connect to db');
  }
  public async update(collName, condition, update, options) {
    return 'real update';
  }
}
