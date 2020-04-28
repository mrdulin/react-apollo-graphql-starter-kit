import { MyDocumentModel } from './my-document';

export async function createDocument(doc: any) {
  return await MyDocumentModel.create(doc);
}
