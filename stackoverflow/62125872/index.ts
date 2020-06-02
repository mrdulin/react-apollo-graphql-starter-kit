import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { userModel, vendorModel, EntityType } from './models';

const JWT_PRIVATE_KEY = 'secret 123';

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_PRIVATE_KEY,
    },
    async (jwtPayload: any, done: any) => {
      const isUser = jwtPayload.type === EntityType.User;
      const model = isUser ? userModel : vendorModel;
      try {
        const document = await model.findOne({ _id: jwtPayload.id });
        if (document) {
          return done(null, jwtPayload);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);
