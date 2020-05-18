import { S3 } from 'aws-sdk';

export class S3Service {
  private readonly s3: S3;
  private readonly bucket: string;
  constructor(private readonly configService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get(''),
      secretAccessKey: this.configService.get(''),
      region: this.configService.get(''),
    });
    this.bucket = this.configService.get('');
  }
  public async upload(name: string, contentType: string, buffer: Buffer): Promise<any> {
    const bucket = this.bucket;
    const params = { Bucket: bucket, Key: 'key', Body: buffer };
    const upload = await this.s3.upload(params).promise();
    return upload;
  }
}
