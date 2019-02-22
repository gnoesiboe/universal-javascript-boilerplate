import express from 'express';
import compression from 'compression';
import bodyparser from 'body-parser';
import loggingMiddleware from './middleware/loggingMiddleware';
import securityMiddleware from './middleware/securityMiddleware';
import authenticationRouter from './routes/authenticationRouter';
import profileRouter from './routes/profileRouter';
import passport from './middleware/securityMiddleware';

const app = express();

export const PORT = process.env.PORT || 3000;

app.set('port', PORT);

app.use(loggingMiddleware);
app.use(compression());
app.use(bodyparser.json());
app.use(securityMiddleware.initialize());
app.use('/authentication', authenticationRouter);
app.use(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    profileRouter
);

app.get('/', (request, response) => {
    response.send({
        title: 'Hallo!',
    });
});

export default app;
