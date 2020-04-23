const app = require('./app');
const request = require('supertest');
const crypto = require('crypto');

describe('61368162', () => {
  it('should verify email', async () => {
    const hashMock = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValueOnce('encrypt 123'),
    };
    const createHashMock = jest.spyOn(crypto, 'createHash').mockImplementationOnce(() => hashMock);
    const logSpy = jest.spyOn(console, 'log');
    const engnr = { token: '123' };
    const response = await request(app).put(`/api/engineer/confirm_mail/${engnr.token}`).send();
    expect(createHashMock).toBeCalledWith('sha256');
    expect(hashMock.update).toBeCalledWith('123');
    expect(hashMock.digest).toBeCalledWith('hex');
    expect(logSpy).toBeCalledWith('encrypt 123');
    expect(response.statusCode).toBe(202);
    expect(response.body).toMatchObject({ message: 'email verified' });
    createHashMock.mockRestore();
    logSpy.mockRestore();
  });

  it('should restore crypto methods', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const response = await request(app).put('/example/123');
    expect(jest.isMockFunction(crypto.createHash)).toBeFalsy();
    expect(response.statusCode).toBe(200);
    expect(logSpy).toBeCalledWith(expect.any(String));
    logSpy.mockRestore();
  });
});
