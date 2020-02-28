import { Service } from './';

describe('60446313', () => {
  it('should pass', async () => {
    const gridItemsMock = JSON.stringify({
      selectedOrder: {
        earlierStartTime: '2/5/2020',
        __id: 'orderId123',
      },
      Collection: [
        {
          __id: 'b1order 1',
          resName: 'New recipe_V1.0',
          plannedQuantity: '3',
          resId: 'ns=6;s=4/ProjectData/1',
          actualQuantity: '1',
          description: 'batchDesc',
        },
      ],
    });
    const dataSourceServiceMock = {
      myPromiseMethod: jest.fn().mockResolvedValueOnce(gridItemsMock),
    };
    const parseSpy = jest.spyOn(JSON, 'parse');
    const service = new Service(dataSourceServiceMock);
    await service.callDataSourceCommand('dialogData', '1');
    expect(dataSourceServiceMock.myPromiseMethod).toBeCalledWith('1', []);
    expect(parseSpy).toBeCalledWith(gridItemsMock);
  });
});
