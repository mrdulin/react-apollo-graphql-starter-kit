import { getAllProducts } from './controller';
import { ProductModel } from './productModel';

describe('61966593', () => {
  it('should pass', () => {
    const mData = { data: [1, 2, 3] };
    const getAllSpy = jest.spyOn(ProductModel.prototype, 'getAll').mockReturnValueOnce(mData);
    const mReq = {};
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    getAllProducts(mReq, mRes);
    expect(getAllSpy).toBeCalledTimes(1);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.send).toBeCalledWith({ data: [1, 2, 3] });
    getAllSpy.mockRestore();
  });
});
