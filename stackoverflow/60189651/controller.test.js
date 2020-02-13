const { create } = require('./controller');
const Driver = require('./models.js');

jest.mock('./models', () => {
  const mDriver = { save: jest.fn() };
  return jest.fn(() => mDriver);
});

describe('60189651', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should create driver and send to client side', () => {
    expect.assertions(3);
    const mReq = {
      body: {
        name: 'name',
        age: 23,
        gender: 'male',
        veichle: 'BMW',
        cnhType: 'type',
        loaded: true,
        truckType: 'truckType',
        oLatitude: 1,
        oLongitude: 1,
        dLongitude: 2,
        dLatitude: 2,
        date: '2020',
      },
    };
    const mRes = { json: jest.fn() };
    const mDriver = new Driver();
    mDriver.save.mockResolvedValueOnce('saved driver');
    return create(mReq, mRes).then(() => {
      expect(Driver).toBeCalledWith({
        name: 'name',
        age: 23,
        gender: 'male',
        veichle: 'BMW',
        cnhType: 'type',
        loaded: true,
        truckType: 'truckType',
        origin: {
          type: 'Point',
          coordinates: [1, 1],
        },
        destination: {
          type: 'Point',
          coordinates: [2, 2],
        },
        date: '2020',
      });
      expect(mDriver.save).toBeCalledTimes(1);
      expect(mRes.json).toBeCalledWith('saved driver');
    });
  });

  it('should handle error if request body is empty', () => {
    const mReq = { body: {} };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    create(mReq, mRes);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.status(400).json).toBeCalledWith({ message: 'Form content can not be empty' });
  });

  it('should handle error if save driver failure', () => {
    expect.assertions(4);
    const mReq = {
      body: {
        name: 'name',
        age: 23,
        gender: 'male',
        veichle: 'BMW',
        cnhType: 'type',
        loaded: true,
        truckType: 'truckType',
        oLatitude: 1,
        oLongitude: 1,
        dLongitude: 2,
        dLatitude: 2,
        date: '2020',
      },
    };
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const mDriver = new Driver();
    const mError = new Error('database connection failure');
    mDriver.save.mockRejectedValueOnce(mError);
    return create(mReq, mRes).then(() => {
      expect(Driver).toBeCalledWith({
        name: 'name',
        age: 23,
        gender: 'male',
        veichle: 'BMW',
        cnhType: 'type',
        loaded: true,
        truckType: 'truckType',
        origin: {
          type: 'Point',
          coordinates: [1, 1],
        },
        destination: {
          type: 'Point',
          coordinates: [2, 2],
        },
        date: '2020',
      });
      expect(mDriver.save).toBeCalledTimes(1);
      expect(mRes.status).toBeCalledWith(500);
      expect(mRes.status(500).send).toBeCalledWith({ message: mError.message });
    });
  });
});
