const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const toRecord = (item) => ({
  id: item.id.S,
  name: item.name.S,
});

const findById = (id) =>
  dynamodb
    .getItem({
      TableName: 'table-name',
      Key: {
        id: { S: id },
      },
    })
    .promise()
    .then((result) => toRecord(result.Item))
    .catch((error) => console.log(error));

module.exports = { findById };
