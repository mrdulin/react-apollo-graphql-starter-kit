import { AbstractCosmosService } from './';
import { CosmosClient } from '@azure/cosmos';

jest.mock('@azure/cosmos', () => {
  return { CosmosClient: jest.fn() };
});

describe('62896064', () => {
  describe('#recordRequestCharge', () => {
    it('should pass', () => {
      const logSpy = jest.spyOn(console, 'log');
      const response = { requestCharge: '' };
      AbstractCosmosService['recordRequestCharge'](response);
      expect(logSpy).toBeCalledWith('record request charge somehow');
    });
  });

  describe('#dbClient', () => {
    it('should pass', () => {
      AbstractCosmosService['CONNECTION_STRING'] = 'localhost:5432';
      AbstractCosmosService['dbClient'];
      expect(CosmosClient).toBeCalledWith('localhost:5432');
    });
  });
});
