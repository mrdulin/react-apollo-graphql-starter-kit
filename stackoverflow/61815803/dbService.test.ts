import { DBService } from './dbService';
import { DbConnector } from './dbConnector';

describe('61815803', () => {
  it('should pass', async () => {
    const records = { ok: 1 };
    const dbConnectorMock = {
      connect: jest.fn(),
      update: jest.fn().mockResolvedValueOnce(records),
    };
    jest.spyOn(DbConnector, 'getInstance').mockReturnValueOnce(dbConnectorMock);
    const dbService = new DBService();
    const actual = await dbService.saveData();
    expect(actual).toEqual({ ok: 1 });
    expect(DbConnector.getInstance).toBeCalledTimes(1);
    expect(dbConnectorMock.connect).toBeCalledTimes(1);
    expect(dbConnectorMock.update).toBeCalledWith('collName', 'condition', {}, {});
  });
});
