import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {
    findAccountWithEmailAndPassword,
    findAccountWithId,
} from './../repository/accountRepository';
import { PRIVATE_KEY } from '../security/tokenGenerator';

passport.use(
    new LocalStrategy((username, password, done) => {
        const account = findAccountWithEmailAndPassword(username, password);

        if (account) {
            done(null, account, { message: 'Logged In Succesfully' });

            return;
        }

        done(null, false, { message: 'Incorrect combination' });
    })
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: PRIVATE_KEY,
        },
        function(jwtPayload, done) {
            const accountId = jwtPayload.id;

            if (!accountId) {
                done(null);

                return;
            }

            const account = findAccountWithId(accountId);

            done(null, account);
        }
    )
);

export default passport;
