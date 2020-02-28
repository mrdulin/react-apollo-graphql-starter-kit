import * as AWS from 'aws-sdk';

export interface IS3Client {
  getFile(bucketName: string, fileName: string): Promise<any>;
}

export class S3Client implements IS3Client {
  private s3Client: AWS.S3;

  constructor() {
    this.s3Client = new AWS.S3();
  }

  public async getFile(bucketName: string, fileName: string): Promise<any> {
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };
    return (await this.s3Client.getObject(params).promise()).Body!.toString();
  }
}
