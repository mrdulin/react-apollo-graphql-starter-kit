import AWS from 'aws-sdk';

const comprehend = new AWS.Comprehend();

export const handler = async (): Promise<any> => {
  const params = {
    JobName: 'first-job',
    InputDataConfig: {
      S3Uri: 'input_bucket_name',
      InputFormat: 'ONE_DOC_PER_FILE',
    },
    OutputDataConfig: {
      S3Uri: 'output_bucket_name',
    },
    DataAccessRoleArn: 'role_arn',
  };

  const result = await comprehend
    .startDominantLanguageDetectionJob(params)
    .promise()
    .catch((error) => {
      throw error;
    });

  return result.JobId;
};
