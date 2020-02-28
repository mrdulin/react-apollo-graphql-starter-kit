import { IS3Client, S3Client } from './s3client';
const s3: IS3Client = new S3Client();

export async function someFunc(event: any, context: any, callback: any) {
  const x: string = await s3.getFile('a', 'b');
}
