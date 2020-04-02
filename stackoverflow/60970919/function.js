import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const uploadToS3 = async (params) => {
  const response = await s3.upload(params).promise();
  return response;
};

export { uploadToS3 };
