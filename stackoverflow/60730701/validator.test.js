const { validateExternalId, schemas } = require('./validator');
const Joi = require('joi');

describe('60730701', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should send error', () => {
    const validationResults = { error: { details: [{ message: 'validation error' }] } };
    const validateSpy = jest.spyOn(Joi, 'validate').mockReturnValueOnce(validationResults);
    const mReq = { params: { extClientId: '123' } };
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    validateExternalId(schemas.idSchema, 'extClientId')(mReq, mRes);
    expect(validateSpy).toBeCalledWith({ param: '123' }, schemas.idSchema);
    expect(mRes.status).toBeCalledWith(400);
    expect(mRes.send).toBeCalledWith('validation error');
  });

  it('should pass the validation and call api', () => {
    const validationResults = { error: undefined };
    const validateSpy = jest.spyOn(Joi, 'validate').mockReturnValueOnce(validationResults);
    const mReq = { params: { extClientId: '123' } };
    const mRes = {};
    const mNext = jest.fn();
    validateExternalId(schemas.idSchema, 'extClientId')(mReq, mRes, mNext);
    expect(validateSpy).toBeCalledWith({ param: '123' }, schemas.idSchema);
    expect(mNext).toBeCalled();
  });
});
