import express from 'express';
import compression from 'compression';
import bodyparser from 'body-parser';
import loggingMiddleware from './middleware/loggingMiddleware';
import securityMiddleware from './middleware/securityMiddleware';
import authenticationRouter from './routes/authenticationRouter';
import profileRouter from './routes/profileRouter';
import passport from './middleware/securityMiddleware';
import {
    AUTHENTICATION_PREFIX,
    createApiProfilePath,
} from './../common/routing/urlGenerator';
import { createNotFoundResponseBody } from './response/factory/errorResponseBodyFactory';
import cors from 'cors';

const app = express();

export const PORT = process.env.PORT || 3000;

app.set('port', PORT);

app.use(cors());
app.use(loggingMiddleware);
app.use(compression());
app.use(bodyparser.json());
app.use(securityMiddleware.initialize());
app.use(AUTHENTICATION_PREFIX, authenticationRouter);

app.use(
    createApiProfilePath(),
    passport.authenticate('jwt', { session: false }),
    profileRouter
);

app.get('*', (request, response) => {
    response.status(404).send(createNotFoundResponseBody('Resource not found'));
});

export default app;
