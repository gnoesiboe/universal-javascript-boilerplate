import { Router } from 'express';
import securityMiddleware from '../middleware/securityMiddleware';
import { Account } from '../../common/model/Account';
import { createAccountToken } from '../security/tokenGenerator';
import { createResponseBody } from '../response/factory/responseBodyFactory';
import { AuthenticationLoginResponseResult } from '../../common/response/types';

const authenticationRouter = Router();

authenticationRouter.post('/login', (request, response, next) => {
    securityMiddleware.authenticate(
        'local',
        { session: false },
        (err, account: Account) => {
            if (err) {
                return next(err);
            }

            if (!account) {
                return response.status(400).send();
            }

            request.login(account, { session: false }, err2 => {
                if (err2) {
                    return next(err);
                }

                const token = createAccountToken(account);

                response.send(
                    createResponseBody<AuthenticationLoginResponseResult>({
                        token,
                    })
                );
            });
        }
    )(request, response);
});

export default authenticationRouter;
