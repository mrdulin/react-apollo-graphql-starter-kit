import { CosmosClient } from '@azure/cosmos';

/**
 * Abstract class with general CosmosDB utilities and wrappers.
 */
export abstract class AbstractCosmosService {
  // TODO: Cannot be abstract yet: microsoft/TypeScript#34516
  protected static CONNECTION_STRING: string;

  protected static get dbClient(): CosmosClient {
    return new CosmosClient(this.CONNECTION_STRING);
  }

  protected static recordRequestCharge(response: any): void {
    if (typeof response === 'object' && response && response.hasOwnProperty('requestCharge')) {
      // TODO: record request charge somehow
      console.log('record request charge somehow');
    }
  }
}
