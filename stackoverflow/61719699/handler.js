import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export async function handler(event) {
  if (event.queryStringParameters.value) {
    await s3.deleteObject({ Bucket: 'my-bucket-name', Key: 'name-of-object' }).promise();
  }

  const putObjectResponse = await s3
    .putObject({ Bucket: 'my-bucket-name', Key: 'name-of-object', ContentType: 'application/json', Body: event.body })
    .promise();

  return putObjectResponse;
}
