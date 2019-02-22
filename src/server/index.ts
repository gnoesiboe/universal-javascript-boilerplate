import app, { PORT } from './app';

const server = app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
});

export default server;
