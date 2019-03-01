import app from './app';
import settings from './config/settings';

const server = app.listen(settings.port, () => {
    // tslint:disable-next-line: no-console
    console.log(`App is running at http://localhost:${settings.port}`);
});

export default server;
