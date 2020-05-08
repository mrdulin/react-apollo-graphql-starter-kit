const liquidation_tracker = require('./liquidation_tracker');

describe('61657292', () => {
  it('should notify if margin ratio is > 0.8', async () => {
    const sendNotificationMock = jest.fn();
    liquidation_tracker.sendNotification = sendNotificationMock;
    await liquidation_tracker.checkLiquidation(true);
    expect(sendNotificationMock).toHaveBeenCalled();
  });
});
