const { create, read, update } = require('./');
const db = require('./db');

jest.mock('./db');

describe('60501363', () => {
  describe('#create', () => {
    it('should create correctly', async () => {
      const mReq = { body: {} };
      const mRes = { sendStatus: jest.fn() };
      jest.spyOn(db.restaurant, 'create').mockResolvedValueOnce({});
      await create(mReq, mRes);
      expect(db.restaurant.create).toBeCalledWith({});
      expect(mRes.sendStatus).toBeCalledWith(200);
    });
    it('should handle error if create failure', async () => {
      const mReq = { body: {} };
      const mRes = { sendStatus: jest.fn() };
      const mError = new Error('network');
      jest.spyOn(db.restaurant, 'create').mockRejectedValueOnce(mError);
      await create(mReq, mRes);
      expect(mRes.sendStatus).toBeCalledWith(500);
    });
  });

  describe('#read', () => {
    it('should read', async () => {
      const mReq = {};
      const mRes = { send: jest.fn().mockReturnThis(), json: jest.fn() };
      jest.spyOn(db.restaurant, 'findAll').mockResolvedValueOnce([]);
      await read(mReq, mRes);
      expect(db.restaurant.findAll).toBeCalledTimes(1);
      expect(mRes.send).toBeCalledWith(200);
      expect(mRes.json).toBeCalledWith([]);
    });
  });

  describe('#update', () => {
    it('should update correctly', async () => {
      const mReq = { params: { id: 1 } };
      const mRes = {};
      jest.spyOn(db.restaurant, 'update').mockResolvedValueOnce({});
      await update(mReq, mRes);
      expect(db.restaurant.update).toBeCalledWith({ name: 'KFC' }, { where: { id: 1 } });
    });
  });
});
