import SES from 'aws-sdk/clients/ses';

const internalErrorMessage = 'internalErrorMessage';

export const user = {
  async forgotPassword(req, res, next) {
    const sesEmailParams = {
      Source: 'Sender Name <sender@recipient.com>',
      Destination: {
        ToAddresses: [],
      },
      Template: 'tpl',
      TemplateData: 'data',
    };
    try {
      const ses = new SES({ apiVersion: '2010-12-01' });
      await ses.sendTemplatedEmail(sesEmailParams).promise();
    } catch (err) {
      return next(internalErrorMessage);
    }
  },
};
