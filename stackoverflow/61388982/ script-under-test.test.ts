import { MyDocumentModel } from './my-document';
import { createDocument } from './script-under-test';

jest.mock('./my-document', () => {
  const mMyDocumentModel = { create: jest.fn() };
  return { MyDocumentModel: mMyDocumentModel };
});

describe('creation', () => {
  it('should create a new document', async () => {
    const payload = { foo: 'bar' };
    MyDocumentModel.create.mockResolvedValueOnce(document);
    const result = await createDocument(payload);
    expect(MyDocumentModel.create).toHaveBeenCalledWith(payload);
    expect(result).toStrictEqual(document);
  });
});
