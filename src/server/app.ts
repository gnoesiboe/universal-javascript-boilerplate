import express from 'express';
import compression from 'compression';
import bodyparser from 'body-parser';
import loggingMiddleware from './middleware/loggingMiddleware';
import securityMiddleware, {
    withAuthenticate,
} from './middleware/securityMiddleware';
import authenticationRouter from './routes/authenticationRouter';
import {
    AUTHENTICATION_PREFIX,
    createApiProfilePath,
} from './../common/routing/urlGenerator';
import { createNotFoundResponseBody } from './response/factory/errorResponseBodyFactory';
import cors from 'cors';
import { createAccountProfileResponseBody } from './response/factory/accountResponseBodyFactory';

const app = express();

export const PORT = process.env.PORT || 3000;

app.set('port', PORT);

app.use(cors());
app.use(loggingMiddleware);
app.use(compression());
app.use(bodyparser.json());
app.use(securityMiddleware.initialize());
app.use(AUTHENTICATION_PREFIX, authenticationRouter);

app.get(createApiProfilePath(), function(request, response, next) {
    withAuthenticate(request, response, next, account => {
        response.send(createAccountProfileResponseBody(account));
    });
});

app.get('*', (request, response) => {
    response.status(404).send(createNotFoundResponseBody('Resource not found'));
});

export default app;
