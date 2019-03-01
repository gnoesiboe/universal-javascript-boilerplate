import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {
    findAccountWithEmailAndPassword,
    findAccountWithId,
} from './../repository/accountRepository';
import { PRIVATE_KEY } from '../security/tokenGenerator';
import { Request, Response, NextFunction } from 'express';
import { createUnauthorizedResponseBody } from '../response/factory/errorResponseBodyFactory';
import { Account } from './../../common/model/Account';

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

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

export default passport;

export const withAuthenticate = (
    request: Request,
    response: Response,
    next: NextFunction,
    callback: (account: Account) => void
) =>
    passport.authenticate('jwt', function(error, account) {
        if (error) {
            return next(error);
        }

        if (!account) {
            return response
                .status(401)
                .send(createUnauthorizedResponseBody('Unauthorized'));
        }

        request.logIn(account, error2 => {
            if (error2) {
                return next(error2);
            }

            return callback(account);
        });
    })(request, response, next);
