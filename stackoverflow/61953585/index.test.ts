import { obj } from './';

describe('61953585', () => {
  it('should pass', () => {
    const datas = obj.getData();
    expect(datas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          productName: expect.objectContaining({
            name: expect.any(String),
            toString: expect.any(Function),
          }),
        }),
      ]),
    );
    const productName1 = datas[0].productName.toString();
    expect(productName1).toBe('github');
    const productName2 = datas[1].productName.toString();
    expect(productName2).toBe('reddit');
  });
});
