const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const findById = (id) =>
  dynamodb
    .getItem({
      TableName: 'table-name',
      Key: {
        id: { S: id },
      },
    })
    .promise();

module.exports = { findById };
