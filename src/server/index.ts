import app, { PORT } from './app';

const server = app.listen(PORT, () => {
    // tslint:disable-next-line: no-console
    console.log(`App is running at http://localhost:${PORT}`);
});

export default server;
