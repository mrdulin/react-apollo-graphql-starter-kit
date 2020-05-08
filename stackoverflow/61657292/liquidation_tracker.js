async function checkLiquidation(sendSms) {
  const requires_notification = [1, 2, 3];
  if (requires_notification.length > 0 && sendSms) {
    exports.sendNotification(requires_notification);
  }
}

async function sendNotification() {
  return null;
}

exports.checkLiquidation = checkLiquidation;
exports.sendNotification = sendNotification;
