import { assertIsDefined } from './../../common/utility/assertion';

const dbUser = process.env.DB_USER;
assertIsDefined(dbUser, 'Please supply a DB_USER .env.server property');

const dbPassword = process.env.DB_PASSWORD;
assertIsDefined(dbPassword, 'Please supply a DB_PASSWORD .env.server property');

const dbHost = process.env.DB_HOST;
assertIsDefined(dbHost, 'Please supply a DB_HOST .env.server property');

const dbName = process.env.DB_NAME;
assertIsDefined(dbName, 'Please supply a DB_NAME .env.server property');

const apiPort = process.env.API_APP_PORT;
assertIsDefined(apiPort, 'Please supply a API_APP_PORT .env.server property');

export default {
    port: apiPort,
    database: {
        user: dbUser,
        password: dbPassword,
        host: dbHost,
        name: dbName,
        connectionLimit: 10,
    },
};
