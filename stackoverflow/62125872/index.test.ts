import { Strategy as JWTStrategy, ExtractJwt, VerifyCallback, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { userModel, vendorModel } from './models';

jest.mock('passport-jwt', () => {
  const mJWTStrategy = jest.fn();
  const mExtractJwt = {
    fromAuthHeaderAsBearerToken: jest.fn(),
  };
  return { Strategy: mJWTStrategy, ExtractJwt: mExtractJwt };
});
jest.mock('passport', () => {
  return { use: jest.fn() };
});

describe('62125872', () => {
  let verifyRef;
  beforeEach(() => {
    const mJwtFromRequestFunction = jest.fn();
    (ExtractJwt.fromAuthHeaderAsBearerToken as jest.MockedFunction<
      typeof ExtractJwt.fromAuthHeaderAsBearerToken
    >).mockReturnValueOnce(mJwtFromRequestFunction);

    (JWTStrategy as jest.MockedClass<any>).mockImplementation((opt: StrategyOptions, verify: VerifyCallback) => {
      verifyRef = verify;
    });
  });

  it('should verify using user model and call done with jwtpayload if user document exists', async () => {
    const payload = { type: 'User', id: 1 };
    const mDone = jest.fn();

    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce('mocked user document');
    await import('./');
    await verifyRef(payload, mDone);
    expect(passport.use).toBeCalledWith(expect.any(Object));
    expect(JWTStrategy).toBeCalledWith(
      { jwtFromRequest: expect.any(Function), secretOrKey: 'secret 123' },
      expect.any(Function),
    );
    expect(ExtractJwt.fromAuthHeaderAsBearerToken).toBeCalledTimes(1);
    expect(userModel.findOne).toBeCalledWith({ _id: 1 });
    expect(mDone).toBeCalledWith(null, { type: 'User', id: 1 });
  });

  it("should verify using user model and call done with false if user document doesn't exist", async () => {
    const payload = { type: 'User', id: 1 };
    const mDone = jest.fn();

    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce('');
    await import('./');
    await verifyRef(payload, mDone);
    expect(passport.use).toBeCalledWith(expect.any(Object));
    expect(JWTStrategy).toBeCalledWith(
      { jwtFromRequest: expect.any(Function), secretOrKey: 'secret 123' },
      expect.any(Function),
    );
    expect(ExtractJwt.fromAuthHeaderAsBearerToken).toBeCalledTimes(1);
    expect(userModel.findOne).toBeCalledWith({ _id: 1 });
    expect(mDone).toBeCalledWith(null, false);
  });

  // you can do the rest parts
});
