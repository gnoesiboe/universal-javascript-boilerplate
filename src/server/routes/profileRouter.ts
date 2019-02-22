import { Router } from 'express';
import { createAccountProfileResponseBody } from './../response/factory/accountResponseBodyFactory';

const profileRouter = Router();

profileRouter.get('/', function(request, response) {
    response.send(createAccountProfileResponseBody(request.user));
});

export default profileRouter;
