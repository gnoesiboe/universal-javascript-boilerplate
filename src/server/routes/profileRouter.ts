import { Router } from 'express';

const profileRouter = Router();

profileRouter.get('/', function(request, response) {
    response.send({
        account: request.user,
    });
});

export default profileRouter;
